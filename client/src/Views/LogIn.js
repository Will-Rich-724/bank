import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

import SignIn from '../Components/SignIn';

const LogIn = (props) => {
    return (
        <div className="main-body">
            <div style={{display : "inline-block"}}>
                <p>PLACE HOLDER FOR BANK LOGO</p>
            </div>
            <div style={{display : "inline-block"}}>
                <SignIn />
                <Link to={'/register'}><Button>Sign Up</Button></Link>
            </div>
        </div>
    )
};

export default LogIn;