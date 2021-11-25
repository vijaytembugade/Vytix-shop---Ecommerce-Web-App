import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch()
    const { loading, error, orders } = useSelector(state => state.orderList)
    const { userInfo } = useSelector(state => state.userLogin)
    // const { success:successDelete } = useSelector(state => state.userDelete)

    const deleteHandler = (id) => {
        // if(window.confirm("Are you sure?")){
        //     dispatch(deleteUser(id))
        // }
    }

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    return (
        <>
            <h1>All Orders</h1>
            { loading ? <Loader /> : error ? <Message variant="danger">{ error }</Message> :
                (
                    <>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>User Name</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                    <th>Paymant method</th>
                                    <th>Paid Status</th>
                                    <th>Delivery Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders &&  orders.map(order => (
                                    <tr key={ order._id }>
                                        <td style={{cursor : "pointer"}} onClick={()=>history.push(`/order/${order._id}`)}>{ order._id.toUpperCase() }</td>
                                        <td>{ order.user.name }</td>
                                        <td>{ order.totalPrice }</td>
                                        <td>{ order.createdAt.substring(0,10) }</td>
                                        <td>{ order.paymentMethod }</td>
                                        <td>
                                            { order.isPaid ? (<i className="fas fa-check" style={ { colot: 'green', } } />) :
                                                (<i className="fas fa-times" style={ { color: "red" } } />)
                                            }
                                        </td>
                                        <td>
                                            { order.isDelivered ? (<i className="fas fa-check" style={ { colot: 'green', } } />) :
                                                (<i className="fas fa-times" style={ { color: "red" } } />)
                                            }
                                        </td>
                                        
                                        {/* <td>
                                            <LinkContainer to={ `/admin/order/${order._id}/edit` }>
                                                <Button variant="light" className="btn-sm">
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant="danger" className="btn-sm" onClick={ () => deleteHandler(user._id) }>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td> */}

                                    </tr>
                                )) }
                            </tbody>
                        </Table>
                    </>
                ) }

        </>
    )
}

export default OrderListScreen
