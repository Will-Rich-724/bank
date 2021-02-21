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
    const [balance, setBalance] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${props.id}`, { withCredentials: true })
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setAccounts(res.data.accounts);
            })
            .catch(err => console.log(err));
    }, []);

    const fromHandler = (accountId) => {
        console.log(accountId);
        let fromAcct = accounts.find(acct => {
            return acct._id === accountId
        });
        setFromAccount(fromAcct);
    };

    const toHandler = (accountId) => {
        console.log(accountId);
        let toAcct = accounts.find(acct => {
            return acct._id === accountId
        });
        setToAccount(toAcct);
    };

    const transferFunds = () => {
        let amount = parseFloat(transferAmount)
        //From Account process and put first
        setBalance(fromAccount.balance -= amount);
        console.log(fromAccount.balance);
        
        axios.put(`http://localhost:8000/api/user/${props.id}/${fromAccount._id}`, {
            balance
        }, { withCredentials: true})
            .then(res => console.log(res))
            .catch(err => console.log(err));

        setBalance(toAccount.balance += amount);
        console.log(toAccount.balance);
        //To Account put
        axios.put(`http://localhost:8000/api/user/${props.id}/${toAccount._id}`, {
            balance
        }, {withCredentials: true})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    return (
        <div className="main-body">
            <h4>Transfer Between Accounts</h4>
            <div style={{display: "inline-block"}}>
                <div>
                    <h4>From:</h4>
                    <select onChange={(e) => fromHandler(e.target.value)}>
                        <option value={0} >Select an Account</option>
                        {accounts.map((account) => (
                            <option key={account._id} value={account._id} >{account.nickName}</option>))}
                    </select>
                    {
                        fromAccount.balance ? <p>Balance: {fromAccount.balance}</p> : null
                    }
                </div>
                <div>
                    <h4>To:</h4>
                    <select onChange={(e) => toHandler(e.target.value)}>
                        <option value={0}>Select an Account</option>
                        {accounts.map((account) => (
                            <option key={account._id} value={account._id} >{account.nickName}</option>))}
                    </select>
                    {
                        toAccount.balance ? <p>Balance: {toAccount.balance}</p> : null
                    }
                </div>
            </div>
            <div style={{display: "inline-block"}}>
                <label>Transfer Amount: </label>
                <input type="number" step=".01" onChange={(e) => setTransferAmount(e.target.value)} />
            </div>
            <div>
                <button onClick={(e) => transferFunds()}>Transfer</button>
            </div>
            <br />
            <div>
                <Link to={`/${props.id}`}><button>Back</button></Link>
            </div>
        </div>
    )
};

export default Transfer;