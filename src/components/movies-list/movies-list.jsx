import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';


import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import './movies-list.scss';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list">
    <Row>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Row>
    <Row>
      <Col className="d-flex flex-wrap justify-content-around">
        {filteredMovies.map(m =>
          <MovieCard key={m._id} movie={m} />)}
      </Col>
    </Row>
  </div >;
}

export default connect(mapStateToProps)(MoviesList);
