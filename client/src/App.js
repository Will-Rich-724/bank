import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import './App.css';

import LogReg from "./Views/LogReg";
import UserPage from "./Views/UserPage";
import AddAccount from "./Views/AddAccount";
import Transfer from "./Views/Transfer";

function App() {
  return (
    <div className="App">
      <Router>
        <LogReg path="/" />
        <UserPage path="/:id" />
        <AddAccount path="/:id/account" />
        <Transfer path="/:id/transfer" />
      </Router>
    </div>
  );
}

export default App;
