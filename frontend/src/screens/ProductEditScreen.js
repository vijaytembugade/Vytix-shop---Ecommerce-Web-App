import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, } from '../actions/productActions'
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";


const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStocks, setCountInStocks] = useState(0);
    const [description, setDescription] = useState("");

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {

        if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStocks(product.countInStocks)
            setDescription(product.description)
        }

    }, [dispatch, history, productId, product]);

    const submitHandler = (e) => {
        e.preventDefault();
        //UPDATE PRODUCT

    };

    return (
        <>
            <Link className="btn btn-dark my-3" to="/admin/productList">
                <i class="fas fa-long-arrow-alt-left" />
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {/* {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant={"danger"}>{error}</Message>} */}
                { loading ? <Loader /> : error ? <Message variant="danger">{ error }</Message> : (
                    <Form onSubmit={ submitHandler }>
                        <Form.Group controlId="Name">
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={ name }
                                onChange={ (e) => setName(e.target.value) }
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>
                                Price
                            </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Price"
                                value={ price }
                                onChange={ (e) => setPrice(e.target.value) }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>
                                Image
                            </Form.Label>
                            <Form.Control
                                type="text"
                                label="Image"
                                value={ image }
                                onChange={ (e) => setImage(e.target.checked) }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="brand">
                            <Form.Label>
                                Brand
                            </Form.Label>
                            <Form.Control
                                type="text"
                                label="brand"
                                value={ brand }
                                onChange={ (e) => setBrand(e.target.checked) }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label>
                                Category
                            </Form.Label>
                            <Form.Control
                                type="text"
                                label="category"
                                value={ category }
                                onChange={ (e) => setCategory(e.target.value) }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="countinstocks">
                            <Form.Label>
                                Count in Stocks
                            </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Coun in Stocks"
                                value={ countInStocks }
                                onChange={ (e) => setCountInStocks(e.target.value) }
                            ></Form.Control>
                        </Form.Group>

                        

                        <Form.Group controlId="description">
                            <Form.Label>
                                Description
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Description"
                                value={ description }
                                onChange={ (e) => setDescription(e.target.value) }
                            ></Form.Control>
                        </Form.Group>

                        <Button className="py-3 mt-3 " type="submit" variant="primary">
                            Save
                        </Button>
                    </Form>

                ) }
            </FormContainer>


        </>
    );
};

export default ProductEditScreen;
