import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './profile-update-view.scss';

export function ProfileUpdateView(props) {
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  const [email, updateEmail] = useState('');
  const [birthday, updateBirthday] = useState('');

  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [emailErr, setEmailErr] = useState({});

  const handleUpdate = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');
    const isValid = formValidation();

    if (isValid) {
      axios.put(`https://mccotter-movie-api.herokuapp.com/users/${userId}`, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Your info has been updated')
          localStorage.removeItem('token');
          localStorage.removeItem('user'); //remove tokens to force user to log in again
          window.open('/', '_self'); //self necessary so page will open in current tab
        })
        .catch(e => {
          console.log('error updating the user')
          alert('error updating: please ensure accuracy of information')
        });
    };
  }

  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    const emailErr = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameErr.usernameShort = 'Username needs at least 5 characters';
      isValid = false;
    }

    if (password.trim().length < 1) {
      passwordErr.passwordMissing = 'Password is required to update';
      isValid = false;
    }

    if (email.trim().length < 1) {
      emailErr.emailMissing = 'Valid email is required to update';
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    setEmailErr(emailErr);
    return isValid;

  }

  return (
    <Form className="profile-update-form">
      <Form.Group>
        <Form.Label>Update User Information</Form.Label>
      </Form.Group>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>New Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => updateUsername(e.target.value)} />
        {Object.keys(usernameErr).map((key) => {
          return <div key={key} style={{ color: 'maroon' }}>{usernameErr[key]}</div>
        })}
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control type="text" value={password} onChange={e => updatePassword(e.target.value)} />
        {Object.keys(passwordErr).map((key) => {
          return <div key={key} style={{ color: 'maroon' }}>{passwordErr[key]}</div>
        })}
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>New Email</Form.Label>
        <Form.Control type="text" value={email} onChange={e => updateEmail(e.target.value)} />
        {Object.keys(emailErr).map((key) => {
          return <div key={key} style={{ color: 'maroon' }}>{emailErr[key]}</div>
        })}
      </Form.Group>

      <Form.Group controlId="formBasicBrthday">
        <Form.Label>New Birthday</Form.Label>
        <Form.Control type="text" value={birthday} onChange={e => updateBirthday(e.target.value)} />
      </Form.Group>
      <Button type="button" className="button" onClick={handleUpdate}>Update</Button>
    </Form>
  )
};
