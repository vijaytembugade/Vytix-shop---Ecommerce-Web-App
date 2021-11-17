import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProduct } from '../actions/productActions'

const ProductListScreen = ({ history, match }) => {
	const dispatch = useDispatch()
	const { loading, error, products } = useSelector(state => state.productList)
	const { userInfo } = useSelector(state => state.userLogin)

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			//delete product
		}
	}

	const createProductHandler = product =>{
		//create product
	}

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listProduct())
		} else {
			history.push('/login')
		}
	}, [dispatch, history, userInfo])

	return (
		<>
			<Row className='align-items-center'>
				<Col><h1>Products</h1></Col>
				<Col className="text-right">
					<Button className="my-3" onClick={ createProductHandler }>
						<i className="fas fa-plus"></i>  Create Product
					</Button>
				</Col>
			</Row>
			<h1>All Users</h1>
			{ loading ? <Loader /> : error ? <Message variant="danger">{ error }</Message> :
				(
					<>
						<Table striped bordered hover responsive className='table-sm'>
							<thead>
								<tr>
									<th>ID</th>
									<th>NAME</th>
									<th>PRICE</th>
									<th>CATEGORY</th>
									<th>BRANDS</th>
								</tr>
							</thead>
							<tbody>
								{ products.map(product => (
									<tr key={ product._id }>
										<td>{ product._id.toUpperCase() }</td>
										<td>{ product.name }</td>
										<td>$ { product.price}</td>
										<td>
											{ product.category}
										</td>
										<td>
											{ product.brand}
										</td>
										<td>
											<LinkContainer to={ `/admin/user/${product._id}/edit` }>
												<Button variant="light" className="btn-sm">
													<i className="fas fa-edit"></i>
												</Button>
											</LinkContainer>
											<Button variant="danger" className="btn-sm" onClick={ () => deleteHandler(product._id) }>
												<i className="fas fa-trash"></i>
											</Button>
										</td>

									</tr>
								)) }
							</tbody>
						</Table>
					</>
				) }

		</>
	)
}

export default ProductListScreen
