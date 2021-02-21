import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

import SignUp from "../Components/SignUp";

const Register = (props) => {
    return(
        <div className="main-body">
            <SignUp />
            <Link to={'/'}><Button>Back to Login</Button></Link>
        </div>
    )
}

export default Register;