import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';

const Transfer = (props) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [accounts, setAccounts] = useState([]);
    const [fromAccount, setFromAccount] = useState({});
    const [toAccount, setToAccount] = useState({});
    const [transferAmount, setTransferAmount] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${props.id}`, { withCredentials: true })
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setAccounts(res.data.accounts);
                // setFromAccount(res.data.accounts[0]);
                // setToAccount(res.data.accounts[0]);
            })
            .catch(err => console.log(err));
    }, []);

    const fromHandler = (accountId) => {
        console.log(accountId);
        let fromAcct = accounts.find(acct => {
            return acct._id === accountId});
        setFromAccount(fromAcct);
    };

    const toHandler = (accountId) => {
        console.log(accountId);
        let toAcct = accounts.find(acct => {
            return acct._id === accountId});
        setToAccount(toAcct);
    };

    const transferFunds = () => {

    };

    return (
        <div>
            <h2>Transfer Between Accounts</h2>
            <div>
                <h3>From:</h3>
                <select onChange={(e) => fromHandler(e.target.value)} defaultValue={accounts[0]}>
                    <option value={0} >Select an Account</option>
                    {accounts.map((account) =>(
                    <option key={account._id} value={account._id} >{account.nickName}</option>))}
                </select>
                {
                    fromAccount.balance ? <p>Balance: {fromAccount.balance}</p> : null
                }
            </div>
            <div>
                <h3>To:</h3>
                <select onChange={(e) => toHandler(e.target.value)} defaultValue={accounts[0]}>
                    {accounts.map((account) =>(
                    <option key={account._id} value={account._id} >{account.nickName}</option>))}
                </select>
                {
                    toAccount.balance ? <p>Balance: {toAccount.balance}</p> : null
                }
            </div>
            <div>
            <label>Transfer Amount: </label>
            <input type="number" defaultValue={0} onChange={(e) => setTransferAmount(e.target.value)} />
            </div>
            <div>
                <button onClick={(e) => transferFunds()}>Transfer</button>
            </div>
        </div>
    )
};

export default Transfer;