import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import '../../App.css';

const JumboTron = (props) => {
  return (
    <div>
      <Jumbotron fluid className="mb-0">
        <Container fluid >
          <h1 className="display-3 d-flex justify-content-center">Welcome to Stock Monitor</h1>
          <p className="lead d-flex justify-content-center">Start searching your stock to see the recent 100-day closing prices.</p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default JumboTron;