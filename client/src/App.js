import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LogIn from "./Views/LogIn";
import Register from "./Views/Register";
import UserPage from "./Views/UserPage";
import AddAccount from "./Views/AddAccount";
import Transfer from "./Views/Transfer";

function App() {
  return (
    <div className="App">
      <Router>
        <LogIn path='/' />
        <Register path="/register" />
        <UserPage path="/:id" />
        <AddAccount path="/:id/account" />
        <Transfer path="/:id/transfer" />
      </Router>
    </div>
  );
}

export default App;
