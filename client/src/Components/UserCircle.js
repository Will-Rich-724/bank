import React, {useState, useEffect} from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';

const UserCircle = (props) => {
    const {firstName, lastName} = props;
    
    const initials = (firstName) => {
        
    }
    
    return(
        <div>
            {initials(firstName)}
        </div>
    )
}

export default UserCircle;