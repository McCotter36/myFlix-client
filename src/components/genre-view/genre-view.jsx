import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if (!genre) return <div className="main-view" />;

    return (
      <div className="genre-view">
        <Card className="genre-card" style={{ width: '40 rem' }}>
          <Card.Body>
            <Card.Title className="genre-name">{genre.Name}</Card.Title>
            <Card.Text className="genre-description">{genre.Description}</Card.Text>
            <Link to={"/"}>
              <Button className='button'>Home</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

// GenreView.propTypes = {
//   genre: PropTypes.shape({
//     Name: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired
//   }).isRequired,
// };