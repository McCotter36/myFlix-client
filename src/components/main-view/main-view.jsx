import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Alert, Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';


export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://mccotter-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
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

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }


  render() {
    let { movies, user } = this.state;

    if (!movies) return <div className="main-view" />;


    return (
      <Container>
        <Navbar className="nav-bar">
          <Navbar.Brand variant="dark" className="brand-title" onClick={() => this.resetMovie()}>myFlix</Navbar.Brand>
          <Nav variant="dark">
            <Nav.Link className="nav-link" variant="dark" onClick={() => this.onLogOut()}>Logout</Nav.Link>
          </Nav>
        </Navbar >

        < Router >
          <div>

            {/* Login / Main View */}
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return movies.map(m => <MovieCard key={m._id} movie={m} />)
            }
            } />

            {/* Registration View */}
            <Route path="/register" render={() => <RegistrationView />} />

            {/* MovieView */}
            <Route exact path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

            {/* Genre View */}
            <Route exact path="/genres/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
            }} />

            {/* Director View */}
            <Route exact path="/directors/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
            }} />

            {/* Profile View */}
            <Route exact path="users/:Username" render={({ match }) => <ProfileView movies={movies} />} />

            <Route exact path="users/:Username/update" render={() =>
              <ProfileUpdate movies={movies} />} />

            <Route path="/logout" render={() => <LoginView />} />
          </div>

        </Router >
      </Container>
    );
  }
}

// MainView.propTypes = {
//   resetMovie: PropTypes.func,
//   onMovieClick: PropTypes.func,
//   onLoggedIn: PropTypes.func,
//   resetUser: PropTypes.func
// };