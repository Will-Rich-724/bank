import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddAccount = (props) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [accounts, setAccounts] = useState([]);
    const [nickName, setNickName] = useState("");
    const [accountType, setAccountType] = useState("Savings");
    const [balance, setBalance] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${props.id}`, { withCredentials: true })
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setAccounts(res.data.accounts);
            })
            .catch(err => console.log(err));
    }, []);

    const AddAccount = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/user/${props.id}/account`, {
            nickName,
            accountType,
            balance
        },
            { withCredentials: true })
            .then(res => {console.log(res)
            navigate(`/${props.id}`)})
            .catch(err => console.log(err));
    }

    return (
        <div className="main-body">
            <h4>Open a New Account</h4>
            <Form onSubmit={AddAccount}>
            <Form.Group controlId="formBasicAccountNickName">
                <Form.Label>Account Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter a name for your Account" onChange={e => setNickName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicAccountType">
                <Form.Label>Account Type:</Form.Label>
                <Form.Control as="select" onChange={e => setAccountType(e.target.value)}>
                    <option value="Savings">Savings</option>
                    <option value="Checking">Checking</option>
                    <option value="Retirement">Retirement</option>
                    <option value="Investment">Investment</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicAccountBalance">
                <Form.Label>Deposit:</Form.Label>
                <Form.Control type="number" placeholder="Deposit Initial Account Amount" onChange={e => setBalance(e.target.value)} />
            </Form.Group>
            </Form>
            <br/>
            <div>
                <Link to={`/${props.id}`}><Button>Back</Button></Link>
            </div>
        </div>
    )
};

export default AddAccount;