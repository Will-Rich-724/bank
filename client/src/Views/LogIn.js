import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import SignIn from '../Components/SignIn';
import bankLogo from '../fakeBanklogo.jpg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LogIn = (props) => {
    return (
        <div className="main-body">
            <Container>
                <Row>
                    <Col>
                        <div className="logo">
                            <img src={bankLogo} style={{ width: "300px" }} />
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div>
                            <SignIn />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default LogIn;