import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  CarouselItem,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import { listProductDetails, createProductReview } from "../actions/productActions";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const { id } = useParams();


  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { error: errorReview, success: successReview } = productReviewCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if(successReview){
      alert('Review Submitted')
      setRating(0)
      setComment('')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, userInfo, successReview]);

  const addToCartHandler = () => {
    dispatch(addToCart(id, qty));
    history.push(`/cart/${id}`);
  };

  function submitHandler(e){
    e.preventDefault()
    dispatch(createProductReview(id, {rating, comment}))
  }
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        <i class="fas fa-long-arrow-alt-left" />
      </Link>

      { loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{ error }</Message>
      ) : (
        <>
          <Row>
            <Col md={ 6 }>
              <Image src={ product.image } alt={ product.name } fluid />
            </Col>
            <Col md={ 3 }>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>{ product.name }</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={ product.rating }
                    text={ `  ${product.numReviews} reviews` }
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Price: ${ product.price }</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h6>Description:</h6>
                  <p>{ product.description }</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={ 3 }>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div className="py-3">Price: ${ product.price }</div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div>
                    Status:{ " " }
                    { product.countInStock > 0 ? "In Stock" : "Out of Stock" }
                  </div>
                </ListGroup.Item>
                { product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={ qty }
                          onChange={ (e) => setQty(e.target.value) }
                        >
                          { [...Array(product.countInStock).keys()].map((x) => (
                            <option key={ x + 1 } value={ x + 1 }>
                              { x + 1 }
                            </option>
                          )) }
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ) }
                <ListGroup.Item>
                  <Button
                    disabled={ product.countInStock > 0 ? false : true }
                    className="btn-block btn-info"
                    onClick={ addToCartHandler }
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <br />
            <Col md={ 6 } className="mt-3">
              <h3>Reviews</h3>
              { product.reviews.length === 0 && <Message variant="info">No Reviews </Message> }
              <ListGroup variant='flush'>
                { product.reviews.map(review => (
                  <ListGroup.Item>
                    <strong>{ review.name }</strong>
                    <Rating value={ review.rating } />
                    <p>{ review.createdAt.substring(0, 10) }</p>
                    <p>{ review.comment }</p>
                  </ListGroup.Item>

                )) }
              </ListGroup>
              <ListGroupItem>
                <h4>Write a customer review</h4>
                {errorReview && <Message variant="danger">{errorReview}</Message>}
                { userInfo ? (<Form onSubmit={ submitHandler }>
                  <Form.Group controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control as="select" value={rating} onChange={e=>setRating(e.target.value)}>
                      <option value=''>Select ...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controllerId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control as="textarea" row="3" value={comment} onChange={e=>setComment(e.target.value)}>
                  </Form.Control>
                  </Form.Group>
                  <Button type="submit" variant="warning">Submit</Button>
                </Form>) : <Message >Please <Link to='/login'>Sign in</Link> to write a review</Message> }
              </ListGroupItem>
            </Col>
          </Row>
        </>
      ) }
    </>
  );
};

export default ProductScreen;
