import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login, testLogin } from "../actions/userAction";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hideAll, setHideAll] = useState(false)

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;


  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect,]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch login
    dispatch(login(email, password));
  };

  const handleTestLogin = (e) => {
    setHideAll(true)
    setEmail("admin@vytix.com")
    setPassword("admin")

  }

  return (
    <div>
      <Row>
        <Col md={ 6 }>
          <FormContainer>
            <h1>Sign In</h1>
            { error && <Message variant="danger">{ error }</Message> }
            { loading && <Loader /> }
            <Form onSubmit={ submitHandler }>
              { !hideAll && <Form.Group>
                <Form.Label>
                  Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={ email }
                  onChange={ (e) => setEmail(e.target.value) }
                ></Form.Control>
              </Form.Group> }

              { !hideAll && <Form.Group>
                <Form.Label>
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={ password }
                  onChange={ (e) => setPassword(e.target.value) }
                ></Form.Control>
              </Form.Group> }

              <Button className="mt-3" type="submit" variant="primary">
                {hideAll ? "Click here again to test sign in" : "Log in"}
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

            {!hideAll && <div>
              <p className="mt-3 mb-1">Click below to test login</p>
              <Button className="" type="submit" variant="warning" onClick={ handleTestLogin }>
                Test Admin User loging
              </Button>
            </div>}
          </FormContainer>
        </Col>

        <Col md={ 6 }>
          <Image className='mt-3 img-fluid' src="/images/loginScreen.png" />
        </Col>
      </Row>

    </div>
  );
};

export default LoginScreen;
