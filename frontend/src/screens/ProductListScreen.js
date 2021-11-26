import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProduct, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import PaginateWork from "../components/PaginateWork";

const ProductListScreen = ({ history, match }) => {
	const [showDeleteProductMessage, setDeleteProductMessage ] = useState(false)
	const pageNumber = match.params.pageNumber || 1
	const dispatch = useDispatch()
	const { loading, error, products, page, pages } = useSelector(state => state.productList)
	const { loading: loadingDelete, error: errorDelete, sucess: successDelete } = useSelector(state => state.productDelete)
	const { loading: loadingCreate, error: errorCreate, sucess: successCreate, product: createdProduct } = useSelector(state => state.productCreate)
	const { userInfo } = useSelector(state => state.userLogin)

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET })

		if (!userInfo.isAdmin) {
			history.push('/login')
		}

		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`)
		} else {
			dispatch(listProduct('', pageNumber))
		}
	}, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])

	console.log()

	const deleteHandler = (id) => {
		if (process.env.NODE_ENV === "development") {
			// if (window.confirm("Are you sure?")) {
			// 	dispatch(deleteProduct(id))
			// }
			setDeleteProductMessage(true)
			setTimeout(()=>{
				setDeleteProductMessage(false)
			}, 3000)
		}else if(process.env.NODE_ENV === 'production'){
			setDeleteProductMessage(true)
			setTimeout(()=>{
				setDeleteProductMessage(false)
			}, 3000)
		}

	}

	const createProductHandler = () => {
		dispatch(createProduct())
	}
	return (
		<>
		{showDeleteProductMessage && <Message variant="secondary">You do not have access to delete Products!</Message>}
			<Row className='align-items-center'>
				<Col><h1>Products</h1></Col>
				<Col className="text-right">
					<Button className="my-3" onClick={ createProductHandler }>
						<i className="fas fa-plus"></i>  Create Product
					</Button>
				</Col>
			</Row>
			{ loadingDelete && <Loader /> }
			{ errorDelete && <Message variant="danger">{ errorDelete }</Message> }
			{ loadingCreate && <Loader /> }
			{ errorCreate && <Message variant="danger">{ errorCreate }</Message> }
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
										<td>$ { product.price }</td>
										<td>
											{ product.category }
										</td>
										<td>
											{ product.brand }
										</td>
										<td>
											<LinkContainer to={ `/admin/product/${product._id}/edit` }>
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
						<PaginateWork pages={ pages } page={ page } isAdmin={ true } />
					</>
				) }

		</>
	)
}

export default ProductListScreen
