import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  const [birthdayErr, setBirthdayErr] = useState({});

  const handleRegister = (e) => {
    e.preventDefault();
    const isValid = formValidation();

    if (isValid) {
      axios.post('https://mccotter-movie-api.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('You have been registered, please login')
          window.open('/', '_self'); //self necessary so page will open in current tab
        })
        .catch(e => {
          console.log('error registering the user')
          alert('please ensure accuracy of information entered')
        });
    };
  }

  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    const emailErr = {};
    const birthdayErr = {};
    let isValid = true;

    if (username.trim().length < 4) {
      usernameErr.usernameShort = 'Username needs at least 5 characters';
      isValid = false;
    }

    if (password.trim().length < 1) {
      passwordErr.passwordMissing = 'Password is required to register';
      isValid = false;
    }

    if (email.trim().length < 1) {
      emailErr.emailMissing = 'Valid email is required to register';
      isValid = false;
    }


    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    setEmailErr(emailErr);
    setBirthdayErr(birthdayErr);
    return isValid;

  }

  return (
    <Form className="registration-form">
      <Form.Group>
        <Form.Label>Please Register</Form.Label>
      </Form.Group>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
        {Object.keys(usernameErr).map((key) => {
          return <div key={key} style={{ color: 'maroon' }}>{usernameErr[key]}</div>
        })}
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} />
        {Object.keys(passwordErr).map((key) => {
          return <div key={key} style={{ color: 'maroon' }}>{passwordErr[key]}</div>
        })}
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
        {Object.keys(emailErr).map((key) => {
          return <div key={key} style={{ color: 'maroon' }}>{emailErr[key]}</div>
        })}
      </Form.Group>

      <Form.Group controlId="formBasicBrthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control type="text" placeholder="YYYY-DD-MM" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      <Button type="button" className="button" onClick={handleRegister}>Register</Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.instanceOf(Date).isRequired
  })
}

