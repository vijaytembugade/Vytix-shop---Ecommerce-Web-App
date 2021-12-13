import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, UpdateUser } from "../actions/userAction";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, sucess: sucessUpdate } = userUpdate;

    useEffect(() => {
        if (sucessUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userList')
        } else {
            if ( !user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, history, userId, user, sucessUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        //dispatch register
        dispatch(UpdateUser({ _id: userId, name, email, isAdmin }))

    };

    return (
        <>
            <Link className="btn btn-dark my-3" to="/admin/userList">
                <i class="fas fa-long-arrow-alt-left" />
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                { loadingUpdate && <Loader /> }
                { errorUpdate && <Message variant={ "danger" }>{ error }</Message> }
                { loading ? <Loader /> : error ? <Message variant="danger">{ error }</Message> : (
                    <Form onSubmit={ submitHandler }>
                        <Form.Group>
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
                        <Form.Group>
                            <Form.Label>
                                Email Address
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                value={ email }
                                onChange={ (e) => setEmail(e.target.value) }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isadmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={ isAdmin }
                                onChange={ (e) => setIsAdmin(e.target.checked) }
                            ></Form.Check>
                        </Form.Group>



                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>

                ) }
            </FormContainer>


        </>
    );
};

export default UserEditScreen;
