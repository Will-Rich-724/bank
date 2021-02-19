import React, {useState, useEffect} from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';

const SignIn = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] =useState("");

    const login = e => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/login",
            {email, password},
            {withCredentials: true}
            )
            .then(res => {
                console.log(res);
                navigate(`/${res.data._id}`);
            })
            .catch(err => {
                console.log(err);
                setErrorMessage(err.response.data.msg)
            });
    };

    return(
        <form onSubmit={login}>
            <div>
            <label>Email:</label>
            <input type="text" name="email" onChange={e => setEmail(e.target.value)} value={email} />
            </div>
            <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={e => setPassword(e.target.value)} value={password} />
            </div>
            <input type="submit" value="Sign In" />
            <p>{errorMessage ? errorMessage : ""} </p>
        </form>
    )
};

export default SignIn;