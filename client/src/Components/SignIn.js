import React, {useState, useEffect} from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SignIn = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] =useState("");

    const login = e => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/login",
            {email, password},
            {withCredentials: true}
            )
            .then(res => {
                console.log(res);
                navigate(`/${res.data._id}`);
            })
            .catch(err => {
                console.log(err);
                setErrorMessage(err.response.data.msg)
            });
    };

    return(
        <Form onSubmit={login}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <p>{errorMessage ? errorMessage : ""} </p>
            <Button variant="primary" class="mr-1" type="Submit">Sign In</Button>
            <Link to={'/register'}><Button>Sign Up</Button></Link>
        </Form>
    )
};

export default SignIn;