import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './profile-view.scss';

export function ProfileView(props) {
  const { username, setUsername } = useState('');
  const { password, setPassword } = useState('');
  const { email, setEmail } = useState('');
  const { birthday, setBirthday } = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('https://mccotter-movie-api.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); //self necessary so page will open in current tab
      })
      .catch(e => {
        console.log('error registering the user')
      });
  };

  return (
    <Form className="registration-form">
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" calue={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicBrthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      <Button type="button" onClick={handleRegister}>Register</Button>
    </Form>
  )
};
