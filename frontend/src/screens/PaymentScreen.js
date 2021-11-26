import React, { useState } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
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
                <Form.Label as="legend">Select Payment Method</Form.Label>

                <Col>
                  <Form.Check
                    type="radio"
                    label="Paypal or Credit Card"
                    id="PayPal"
                    name="paymentMethod"
                    value="PayPal"
                    required
                    Checked={true}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                  <Form.Check
                    type="radio"
                    label="Stripe"
                    id="Strip"
                    name="paymentMethod"
                    value="Stripe"
                    disabled
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                </Col>
              </Form.Group>

              <Button className="mt-3" type="submit" variant="primary">
                Continue
              </Button>
            </Form>
          </FormContainer>
        </Col>
        <Col>
          <Image className='mt-3 img-fluid' alt="payment iamge" src="/images/paymentImage.svg"/>
        </Col>
      </Row>
    </>
  );
};

export default PaymentScreen;
