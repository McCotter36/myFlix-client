import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Alert, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      movies: [],
    };
  }

  getUser(token) {
    const userId = localStorage.getItem('user');

    axios.get(`https://mccotter-movie-api.herokuapp.com/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        this.setState({
          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
          FavoriteMovies: res.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  deleteUser() {
    if (!confirm('Are you sure you wish to delete your profile?')) return;
    axios.delete(`https://mccotter-movie-api.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then((res) =>
        console.log(res))
    alert('Your profile had been deleted.')
    this.onLoggedOut();
  }

  removeFavoriteMovie(movie) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');

    axios.delete(`https://mccotter-movie-api.herokuapp.com/users/${userId}/Movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        console.log(res);
        this.componentDidMount();
      });
  }

  render() {
    const { movies } = this.props;
    const userFavoriteMovies = this.state.FavoriteMovies;
    const FavoriteMoviesList = movies.filter((movie) => userFavoriteMovies.includes(movie._id));

    return (
      <Container>
        <Card className="profile-card" >
          <Card.Body >
            <Card.Text>Username: {this.state.Username}</Card.Text>
            <Card.Text>Email: {this.state.Email}</Card.Text>

            {/*
  <Form className="registration-form">
      <Form.Group>
        <Form.Label>Please Register</Form.Label>
      </Form.Group>
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
        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicBrthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      <Button type="button" className="button" onClick={handleRegister}>Register</Button> */}

            <div className="profile-nav">

              <Link to={'/'}>
                <Button className="button" >Home</Button>
              </Link>
              <Link to={'/users/:userId/update'} >
                <Button onClick={() => this.deleteUser()} className="button-link" variant="link"> Delete Profile</Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
        <h2 className="title">My Favorite Movies</h2>
        {FavoriteMoviesList.map((movie) => {
          return (
            <Container>
              <Row className="justify-content-md-center">
                <Col lg="3">
                  <Card key={movie._id} className="movie-card" style={{ width: '16rem' }}>
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body>
                      <Link to={`/movies/${movie._id}`}>
                        <Button className='button'>Movie Info</Button>
                      </Link>
                      <Button variant="link" className="button-link" onClick={() => this.removeFavoriteMovie(movie)}>Remove From Favorites</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          );
        })}
      </Container>
    );
  }
}