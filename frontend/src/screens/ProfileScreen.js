import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Form, Button, Row, Col, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from '../actions/orderActions'
import Meta from "../components/Meta";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmedPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrder, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user,userInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch register
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      //dispatch update profile
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  const imageLoaderStyle = {
    width: "100px",
    height: "100px"
  }

  return (
    <Row>
      <Meta title={`Vitix Profile | ${name}`}/>
      <Col md={ 3 }>
        <h2>User Profile</h2>
        { message && <Message variant="danger">{ message }</Message> }
        { error && <Message variant="danger">{ error }</Message> }
        { success && <Message variant="success">Profile Updated</Message> }
        { loading ? <Image style={ imageLoaderStyle } src="https://upload.wikimedia.org/wikipedia/commons/2/29/Loader.gif" /> : <Form onSubmit={ submitHandler }>
          <Form.Group>
            <Form.Label>
              Name
              <Form.Control
                type="name"
                placeholder={ name }
                value={ name }
                onChange={ (e) => setName(e.target.value) }
              ></Form.Control>
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Email Address
              <Form.Control
                type="email"
                placeholder={ user.email }
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
              ></Form.Control>
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Password
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
              ></Form.Control>
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Confirm Password
              <Form.Control
                type="password"
                placeholder="Enter password again "
                value={ confirmPassword }
                onChange={ (e) => setConfirmedPassword(e.target.value) }
              ></Form.Control>
            </Form.Label>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form> }

      </Col>
      <Col md={ 9 }>
        <h2>My Orders</h2>
        { loadingOrders ? (
          <Loader />
        ) : errorOrder ? (
          <Message variant='danger'>{ errorOrder }</Message>
        ) : 
            <Table striped bordered hover responsive className='table-sm'>
          <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { orders.map((order) => (
                <tr key={ order._id }>
                  <td>{ order._id }</td>
                  <td>{ order.createdAt.substring(0, 10) }</td>
                  <td>{ order.totalPrice }</td>
                  <td>
                    { order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={ { color: 'red' } }></i>
                    ) }
                  </td>
                  <td>
                    { order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={ { color: 'red' } }></i>
                    ) }
                  </td>
                  <td>
                    <LinkContainer to={ `/order/${order._id}` }>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
        }
      </Col>
    </Row>
  );
};

export default ProfileScreen;
