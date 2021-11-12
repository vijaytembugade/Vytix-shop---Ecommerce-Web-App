import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from '../components/Message'
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { createOrder, getOrderDetails, payOrder } from "../actions/orderActions";
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const OrderScreen = ({ history, match }) => {
    const orderId = match.params.id
    const [sdkReady, setSdkReady] = useState(false)


    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay;
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed()
    }

    if (!loading) {

        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }

    useEffect(() => {

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
              setSdkReady(true)
            }
            document.body.appendChild(script)
          }
      
          if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
          } else if (!order.isPaid) {
            if (!window.paypal) {
              addPayPalScript()
            } else {
              setSdkReady(true)
            }
          }
    }, [order, orderId, dispatch, successPay, sdkReady ])



    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult));

    }




    const imageLoaderStyle = {
        width: "50px",
        height: "50px"
    }


    return loading ? <Loader /> : error ? (<Message variant="danger">{ error }</Message>) : (<>
        <h1>Order { order._id.toUpperCase() }</h1>
        <Row>
            <Col md={ 8 }>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name : </strong>{ order.user.name }
                        </p>
                        <p>
                            <strong>Email : </strong>{ order.user.email }
                        </p>
                        <p>
                            <strong>Address: </strong>
                            { order.shippingAddress.address }, { order.shippingAddress.city }, { order.shippingAddress.postalCode }, { order.shippingAddress.country }
                        </p>
                        <p>
                            { order.isDelivered ? <Message variant="success">Delivered At { order.DeliveredAt }</Message> : <Message variant="danger">Not Delivered</Message> }
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        { order.paymentMethod }
                        <p>
                            { order.isPaid ? <Message variant="success">Paid At { order.paidAt }</Message> : <Message variant="danger">Not Paid</Message> }
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        { order.orderItems.length === 0 ? <Message variant="info">No orders yet!</Message> : (
                            <ListGroup variant="flush">
                                { order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={ index }>
                                        <Row>
                                            <Col md={ 1 }>
                                                <Image src={ item.image } alt={ item.name } fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={ `/product/${item.product}` }>
                                                    { item.name }
                                                </Link>
                                            </Col>
                                            <Col md={ 4 }>
                                                { item.qty } x ${ item.price } = ${ addDecimals(item.qty * item.price) }
                                            </Col>

                                        </Row>
                                    </ListGroup.Item>
                                )) }
                            </ListGroup>
                        ) }
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={ 4 }>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Items
                                </Col>
                                <Col>
                                    ${ order.itemsPrice }
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Shipping
                                </Col>
                                <Col>
                                    ${ order.shippingPrice }
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Tax
                                </Col>
                                <Col>
                                    ${ order.taxPrice }
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Total
                                </Col>
                                <Col>
                                    ${ order.totalPrice }
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        { !order.isPaid && (
                            <ListGroup.Item>
                                { loadingPay && <Loader /> }
                                { !sdkReady ? <Image style={ imageLoaderStyle } src="https://upload.wikimedia.org/wikipedia/commons/2/29/Loader.gif" /> : <PayPalButton amount={ order.totalPrice } onSuccess={ successPaymentHandler } /> }
                            </ListGroup.Item>
                        ) }
                        {/* <ListGroup.Item>
                            { error && <Message variant="danger">{ error }</Message> }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disbaled={ cart.cartItems === 0 } onClick={ placeorderhandler }>Placeorder</Button>
                        </ListGroup.Item> */}


                        <p>Demo Credentials for payment </p>
                        <p>Email : sb-kzkrr8468107@personal.example.com </p>
                        <p>Password: B.b8j|4X </p>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>)
}

export default OrderScreen