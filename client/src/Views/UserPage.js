import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import LogOutButton from '../Components/LogOutButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseAccountButton from '../Components/CloseAccountButton';

const UserPage = (props) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${props.id}`, { withCredentials: true })
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setAccounts(res.data.accounts);
            })
            .catch(err => console.log(err));
    }, []);

    const removeFromDom = (accountId) => {
        setAccounts(accounts.filter(account => account._id != accountId))
    }

    return (
        <div className="main-body">
        <Container>
            <Row>
            <Col>
            <div>
                <h5>Welcome:</h5>
                <h4>{firstName}</h4>
                <LogOutButton />
            </div>
            </Col>
            <Col sm={9}>
            <div>
                <h5>Accounts:</h5>
                <Accordion>
                    {accounts.map((account, index) => (
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey={account._id}>
                                {account.nickName}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={account._id}>
                                <Card.Body>
                                    <Row>
                                    <Col>
                                    Type of Account: {account.accountType}
                                    <br />
                                    Balance: ${account.balance}
                                    <br/>
                                    </Col>
                                    <Col>
                                    <CloseAccountButton accountId={account._id} userId={props.id} balance={account.balance} successCallback={() =>removeFromDom(account._id)}/>
                                    </Col>
                                    </Row>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    ))}
                </Accordion>
                <Link to={`/${props.id}/account`}><Button className="btn">Open a new account</Button></Link>
                <Link to={`/${props.id}/transfer`}><Button className="btn">Transfer between accounts</Button></Link>
            </div>
            </Col>
            </Row>
            </Container>
        </div>
    )
}

export default UserPage;