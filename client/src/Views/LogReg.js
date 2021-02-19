import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';

import SignIn from '../Components/SignIn';
import SignUp from "../Components/SignUp";

const LogReg = (props) => {
    return (
        <div>
            <SignIn />
            <SignUp />
        </div>
    )
};

export default LogReg;