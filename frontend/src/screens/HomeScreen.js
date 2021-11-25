import React, { useEffect, useState } from "react";
import Products from "../products";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { listProduct } from "../actions/productActions";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import PaginateWork from "../components/PaginateWork";

const HomeScreen = ({match}) => {


  const keyWord = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProduct(keyWord, pageNumber));
  }, [dispatch, pageNumber,keyWord]);

  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productList
  );


  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
        <Row>
          <h1>Latest Products</h1>
          {products &&
            products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
        <PaginateWork  pages={pages} page={page} keyword={keyWord ? keyWord : ''} />
        
        </>
      )}
    </>
  );
};

export default HomeScreen;
