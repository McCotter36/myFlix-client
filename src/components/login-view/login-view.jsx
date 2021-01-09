import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send request to server for authentification */
    axios.post('https://mccotter-movie-api.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  return (
    <Form className="login-form">
      <Form.Group>
        <Form.Label>Please Log In</Form.Label>
      </Form.Group>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password
           <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Label>
      </Form.Group>
      <Button className="button" variant="primary" type="submit" onClick={handleSubmit}>
        Submit
        </Button>
      <Link to={"/register"}>
        <Button className="button-link" variant="link" >Register</Button>
      </Link>
    </Form >
  )
}

LoginView.propTypes = {
  setUserName: PropTypes.func,
  setPassword: PropTypes.func,
  handleSubmit: PropTypes.func
}
