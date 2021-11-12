import React, { useState } from "react";
import { Form, ButtonProps, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };
  return (
    <>
      <CheckoutSteps step1 step2 />
      <Row>
        <Col md={7}>
          <FormContainer>
            <h1>Shipping </h1>
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label>
                  Address
                  <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
                </Form.Label>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  City
                  <Form.Control
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  ></Form.Control>
                </Form.Label>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  PostalCode
                  <Form.Control
                    type="text"
                    placeholder="Enter PostalCode"
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  ></Form.Control>
                </Form.Label>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Country
                  <Form.Control
                    type="text"
                    placeholder="Enter Country"
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                  ></Form.Control>
                </Form.Label>
              </Form.Group>

              <Button type="submit" variant="primary">
                Continue
              </Button>
            </Form>
          </FormContainer>
        </Col>
        <Col md={5}>Demo Image</Col>
      </Row>
    </>
  );
};

export default ShippingScreen;
