import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card bg="light" border="warning" className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img style={{height: "200px"}} src={product.image} variant="top"></Card.Img>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title> <h4 maxLength={10}>{product.name}</h4></Card.Title>
        </Link>
        <Card.Text>
          <Rating
            value={product.rating}
            text={` ${product.numReviews} reviews`}
          />
        </Card.Text>
        <hr />
        <Card.Text as="strong"> Price: ${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
