import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';

import SignUp from "../Components/SignUp";

const Register = (props) => {
    return(
        <div className="main-body">
            <SignUp />
            <Link to={'/'}><button>Back to Login</button></Link>
        </div>
    )
}

export default Register;