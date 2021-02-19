import React, {useState, useEffect} from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';

const UserPage = (props) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${props.id}`, {withCredentials: true})
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setAccounts(res.data.accounts);
            })
            .catch(err => console.log(err));
    }, []);

    return(
        <div>
            <h1>{firstName} {lastName}</h1>
            <h2>Accounts:</h2>
            <table>
                <tr>
                    <th>Account Name</th>
                    <th>Account Type</th>
                    <th>Account Balance</th>
                </tr>
                {accounts.map((account, index) => (
                    <tr key={index}>
                        <td>{account.nickName}</td>
                        <td>{account.accountType}</td>
                        <td>{account.balance}</td>
                    </tr>
                ))}
            </table>
            <Link to={`/${props.id}/account`}><button>Open a new account</button></Link>
            <Link to={`/${props.id}/transfer`}><button>Transfer between accounts</button></Link>
        </div>
    )
}

export default UserPage;