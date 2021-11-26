import React, { useState } from "react";
import { Form, ButtonProps, Button, Row, Col, Image } from "react-bootstrap";
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
        <Col md={ 6 }>
          <FormContainer>
            <h1>Shipping </h1>
            <Form onSubmit={ submitHandler }>
              <Form.Group>
                <Form.Label>
                  Address
                </Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  placeholder="Enter Address"
                  value={ address }
                  required
                  onChange={ (e) => setAddress(e.target.value) }
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  City
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  value={ city }
                  required
                  onChange={ (e) => setCity(e.target.value) }
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  PostalCode
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter PostalCode"
                  value={ postalCode }
                  required
                  onChange={ (e) => setPostalCode(e.target.value) }
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Country
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Country"
                  value={ country }
                  required
                  onChange={ (e) => setCountry(e.target.value) }
                ></Form.Control>
              </Form.Group>

              <Button className="mt-3" type="submit" variant="primary">
                Continue
              </Button>
            </Form>
          </FormContainer>
        </Col>
        <Col>
          <Image className='mt-3 img-fluid' alt="shipping iamge" src="/images/shippingImage.png" />
        </Col>
      </Row>
    </>
  );
};

export default ShippingScreen;
