import React, {useState, useEffect} from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import Form from 'react-bootstrap/Form'

const SignUp = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [accounts, setAccounts] = useState([])

    const register = e => {
        e.preventDefault();

        axios
            .post("http://localhost:8000/api/register", {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accounts
            },
            { withCredentials: true})
            .then(res => {
                console.log(res);
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            })
            .catch(err => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    };

    return(
        <form onSubmit={register}>
            <div>
                <label>First Name:</label>
                <input type="text" name="firstName" onChange={e => setFirstName(e.target.value)} value={firstName}></input>
                {errors.firstName ? <p>{errors.firstName.message}</p> : ""}
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" name="lastName" onChange={e => setLastName(e.target.value)} value={lastName}></input>
                {errors.lastName ? <p>{errors.lastName.message}</p> : ""}
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" onChange={e => setEmail(e.target.value)} value={email}></input>
                {errors.email ? <p>{errors.email.message}</p> : ""}
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" onChange={e => setPassword(e.target.value)} value={password}></input>
                {errors.password ? <p>{errors.password.message}</p> : ""}
            </div>
            <div>
                <label>Confirm Password:</label>
                <input type="password" name="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}></input>
                {errors.confirmPassword ? <p>{errors.confirmPassword.message}</p> : ""}
            </div>
            <input type="Submit" value="Sign Up" />
        </form>
    )
};

export default SignUp;