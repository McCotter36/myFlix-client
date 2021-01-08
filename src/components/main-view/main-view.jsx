import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Alert, Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import './main-view.scss'

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null,
      movies: null,
      selectedMovie: null,
      newUser: null
    };

    this.resetMovie = this.resetMovie.bind(this);
  }

  componentDidMount() {
    axios.get('https://mccotter-movie-api.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  resetMovie() {
    this.setState({
      selectedMovie: null
    });
  }
  resetUser() {
    this.setState({
      user: null
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }


  render() {
    const { movies, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!movies) return <div className="main-view" />;


    return (
      <Container>
        <Navbar className="nav-bar">
          <Navbar.Brand variant="dark" className="brand-title" onClick={() => this.resetMovie()}>myFlix</Navbar.Brand>
          <Nav variant="dark">
            <Nav.Link className="nav-link" variant="dark" onClick={() => this.resetUser()}>Logout</Nav.Link>
          </Nav>
        </Navbar >
        <Row className="main-view justify-content-md-center">
          {this.state.selectedMovie
            ? (
              <Col md={8}>
                <MovieView movie={this.state.selectedMovie} onClick={() => this.resetMovie()} />
              </Col>
            )
            :
            movies.map(movie => (
              <Col md={3}>
                <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
              </Col>
            ))
          }
        </Row>
      </Container >
    );
  }
}

MainView.propTypes = {
  resetMovie: PropTypes.func,
  onMovieClick: PropTypes.func,
  onLoggedIn: PropTypes.func,
  resetUser: PropTypes.func
};