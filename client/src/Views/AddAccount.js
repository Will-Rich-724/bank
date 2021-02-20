import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';

const AddAccount = (props) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [accounts, setAccounts] = useState([]);
    const [nickName, setNickName] = useState("");
    const [accountType, setAccountType] = useState("Savings");
    const [balance, setBalance] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${props.id}`, { withCredentials: true })
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setAccounts(res.data.accounts);
            })
            .catch(err => console.log(err));
    }, []);

    const AddAccount = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/user/${props.id}/account`, {
            nickName,
            accountType,
            balance
        },
            { withCredentials: true })
            .then(res => {console.log(res)
            navigate(`/${props.id}`)})
            .catch(err => console.log(err));
    }

    return (
        <div className="main-body">
            <h1>Open a New Account</h1>
            <form onSubmit={AddAccount}>
                <div>
                    <label>Account Name:</label>
                    <input type="text" name="nickName" onChange={e => setNickName(e.target.value)} value={nickName}></input>
                    {errors.nickName ? <p>{errors.nickName.message}</p> : ""}
                </div>
                <div>
                    {/* <label>Account Type:</label>
                    enum: ['Savings', 'Checking', 'Retirement', 'Investment']
                    <input type="text" name="accountType" onChange={e => setAccountType(e.target.value)} value={accountType}></input>
                    {errors.accountType ? <p>{errors.accountType.message}</p> : ""} */}
                    <select onChange={(e) => setAccountType(e.target.value)} defaultValue={""}>
                    <option value="Savings">Savings</option>
                    <option value="Checking">Checking</option>
                    <option value="Retirement">Retirement</option>
                    <option value="Investment">Investment</option>
                    </select>
                </div>
                <div>
                    <label>Deposit:</label>
                    <input type="number" step="0.01" min="0" name="balance" onChange={e => setBalance(e.target.value)} value={balance}></input>
                    {errors.balance ? <p>{errors.balance.message}</p> : ""}
                </div>
                <input type="submit" value="Open Account"/>
            </form>
            <br/>
            <div>
                <Link to={`/${props.id}`}><button>Back</button></Link>
            </div>
        </div>
    )
};

export default AddAccount;