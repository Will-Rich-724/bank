import React, {useState, useEffect} from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

const CloseAccountButton = (props) => {
    const {accountId, userId, balance, successCallback} = props
    
    const deleteAccount = e => {
        axios.delete(`http://localhost:8000/api/user/${userId}/${accountId}`)
            .then(res => {successCallback();})
    }
    
    return(
        <Button variant="danger" onClick={deleteAccount}>Close Account</Button>
    )
}

export default CloseAccountButton;