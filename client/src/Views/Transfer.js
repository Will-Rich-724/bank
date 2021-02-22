import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Transfer = (props) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [accounts, setAccounts] = useState([]);
    const [fromAccount, setFromAccount] = useState({});
    const [toAccount, setToAccount] = useState({});
    const [transferAmount, setTransferAmount] = useState(0);


    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${props.id}`, { withCredentials: true })
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setAccounts(res.data.accounts);
            })
            .catch(err => console.log(err));
    }, []);

    const fromHandler = (accountId) => {
        console.log(accountId);
        let fromAcct = accounts.find(acct => {
            return acct._id === accountId
        });
        setFromAccount(fromAcct);
    };

    const toHandler = (accountId) => {
        console.log(accountId);
        let toAcct = accounts.find(acct => {
            return acct._id === accountId
        });
        setToAccount(toAcct);
    };

    const transferFunds = (e) => {
        let amount = parseFloat(transferAmount)
        //From Account process and put first
        fromAccount.balance -= amount
        console.log(fromAccount.balance);
        
        axios.put(`http://localhost:8000/api/user/${props.id}/${fromAccount._id}`, {
            "balance" : fromAccount.balance 
        }, { withCredentials: true})
            .then(res => console.log(res))
                
            .catch(err => console.log(err));

        toAccount.balance += amount;
        console.log(toAccount.balance);
        //To Account put
        axios.put(`http://localhost:8000/api/user/${props.id}/${toAccount._id}`, {
            "balance" : toAccount.balance
        }, {withCredentials: true})
            .then(res => console.log(res))
                // .then(navigate(`/${props.id}`))
            .catch(err => console.log(err));

    
    };

    return (
        <div className="main-body">
            <Container>
                <Row>
                    <Col>
            <div><h4>Transfer Between Accounts</h4>
            <Link to={`/${props.id}`}><Button>Back</Button></Link>
            </div>
            </Col>
            <Col xs={9}>
            <Form>
                <Form.Row>
                <Form.Group as={Col} controlId="fromAccount">
                    <Form.Label>From Account:</Form.Label>
                    <Form.Control as="select" onChange={(e) => fromHandler(e.target.value)}>
                        <option value={0}>Select an Account</option>
                        {accounts.map((account) => (
                            <option key={account._id} value={account._id} >{account.nickName} ; {account.accountType}</option>))}
                    </Form.Control>
                    {
                        fromAccount.balance ? <p>Balance: ${fromAccount.balance}</p> : null
                    }
                </Form.Group>
                <Form.Group as={Col} controlId="toAccount">
                    <Form.Label>To Account:</Form.Label>
                    <Form.Control as="select" onChange={(e) => toHandler(e.target.value)}>
                        <option value={0}>Select an Account</option>
                        {accounts.map((account) => (
                            <option key={account._id} value={account._id} >{account.nickName} ; {account.accountType}</option>))}
                    </Form.Control>
                    {
                        toAccount.balance ? <p>Balance: ${toAccount.balance}</p> : null
                    }
                </Form.Group>
                </Form.Row>
                <Form.Group controlId="transferAmount">
                    <Form.Label>Transfer Amount:</Form.Label>
                    <Form.Control type="number" step=".01" palceholder="Amount to  be transfer" onChange={(e) => setTransferAmount(e.target.value)} />
                </Form.Group>
                <Button onClick={(e) => transferFunds(e)}>Transfer</Button>
            </Form>
            </Col>
            </Row>
            </Container>
        </div>
    )
};

export default Transfer;