import React, {useState, useEffect} from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';

const LogOutButton = (props) => {
    const logout = () => {
        axios.post("http://localhost:8000/api/logout", {},{
            withCredentials: true
        })
        .then(res => {
            console.log(res)
            navigate("/");
        })
        .catch(err => console.log(err))
    }

    return(
        <button onClick={logout}>Logout</button>
    )
};

export default LogOutButton;