import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return <div className="main-view" />;
    console.log(director.Bio);

    return (
      <div className="director-view">
        <Card className="director-card" style={{ width: '40 rem' }}>
          <Card.Body>
            <Card.Title className="director-name">{director.Name}</Card.Title>
            <Card.Text className="director-life">{director.Birth} - {director.Death}</Card.Text>
            <Card.Text className="director-bio">{director.Bio}</Card.Text>
            <Link to={"/"}>
              <Button className='button'>Home</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}


// DirectorView.propTypes = {
//   director: PropTypes.shape({
//     Name: PropTypes.string.isRequired,
//     Bio: PropTypes.string.isRequired
//   }).isRequired,
//   onClick: PropTypes.func.isRequired
// };