import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';

import SignIn from '../Components/SignIn';

const LogIn = (props) => {
    return (
        <div className="main-body">
            <div>
                <p>PLACE HOLDER FOR BANK LOGO</p>
            </div>
            <div>
                <SignIn />
                <Link to={'/register'}><button>Sign Up</button></Link>
            </div>
        </div>
    )
};

export default LogIn;