import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch login
    dispatch(login(email, password));
  };


  return (
    <div>
      <Row>
        <Col md={ 6 }>
          <FormContainer>
            <h1>Sign In</h1>
            { error && <Message variant="danger">{ error }</Message> }
            { loading && <Loader /> }
            <Form onSubmit={ submitHandler }>
              <Form.Group>
                <Form.Label>
                  Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={ email }
                  onChange={ (e) => setEmail(e.target.value) }
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={ password }
                  onChange={ (e) => setPassword(e.target.value) }
                ></Form.Control>
              </Form.Group>

              <Button className="mt-3" type="submit" variant="primary">
                Sign In
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
                New Customer?{ " " }
                <Link to={ redirect ? `/register?redirect=${redirect}` : `/register` }>
                  <strong>Register</strong>
                </Link>
              </Col>
            </Row>
          </FormContainer>
        </Col>

        <Col md={ 6}>
          <Image className='mt-3 img-fluid' src="/images/loginScreen.png" />
        </Col>
      </Row>

    </div>
  );
};

export default LoginScreen;
