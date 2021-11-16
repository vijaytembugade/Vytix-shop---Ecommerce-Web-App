import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserList, deleteUser } from '../actions/userAction'

const UserListScreen = ({history}) => {
    const dispatch = useDispatch()
    const { loading, error, users } = useSelector(state => state.userList)
    const { userInfo } = useSelector(state => state.userLogin)
    const { success:successDelete } = useSelector(state => state.userDelete)

    const deleteHandler=(id)=>{
        if(window.confirm("Are you sure?")){
            dispatch(deleteUser(id))
        }
    }

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(getUserList())
        }else{
            history.push('/login')
        }
    }, [dispatch, history, successDelete])

    return (
        <>
            <h1>All Users</h1>
            { loading ? <Loader /> : error ? <Message variant="danger">{ error }</Message> :
                (
                    <>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={ user._id }>
                                        <td>{ user._id.toUpperCase() }</td>
                                        <td>{ user.name }</td>
                                        <td>{ user.email }</td>
                                        <td>
                                            { user.isAdmin ? (<i className="fas fa-check" style={ { colot: 'green', } } />) :
                                                (<i className="fas fa-times" style={ { color: "red" } } />)
                                            }
                                        </td>
                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant="light" className="btn-sm">
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant="danger" className="btn-sm" onClick={()=>deleteHandler(user._id)}>
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

export default UserListScreen
