import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={7}>
          <FormContainer>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label as="legend">Select Method</Form.Label>

                <Col>
                  <Form.Check
                    type="radio"
                    label="Paypal or Credit Card"
                    id="PayPal"
                    name="paymentMethod"
                    value="PayPal"
                    Checked={true}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                  <Form.Check
                    type="radio"
                    label="Stripe"
                    id="Strip"
                    name="paymentMethod"
                    value="Stripe"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                </Col>
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

export default PaymentScreen;