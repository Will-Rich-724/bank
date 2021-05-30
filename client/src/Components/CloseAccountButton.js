import React, {useState, useEffect} from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

const CloseAccountButton = (props) => {
    const {accountId, userId, balance, successCallback} = props;
    const [errMessage, setErrMessage] = useState("")
    
    const deleteAccount = e => {
        if (balance > 0) {
            setErrMessage("Account must have zero dollars to be closed")
            return console.log("An Account must have a balance of zero dollars to be closed")
        }else{
        axios.delete(`http://localhost:8000/api/user/${userId}/${accountId}`)
            .then(res => {successCallback();})
        }
    }
    
    return(
        <span>
            <Button variant="danger" onClick={deleteAccount}>Close Account</Button>
            <br/>
            {errMessage ? errMessage : null}
        </span>
    )
}

export default CloseAccountButton;