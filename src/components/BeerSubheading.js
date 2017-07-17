import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BeerTitle from './BeerTitle';

const BeerSubheading = (props) => {
  const beer = props.beer;

  return (
    <Grid fluid>
      <Row>
        <Col lg={3} md={5} sm={6} xs={12}>
          <BeerTitle beer={beer} />
        </Col>
        { beer.abv &&
          <Col xs={4} sm={2} md={2} lg={1}>
            <b>ABV</b>
            <p>{beer.abv || '?'} %</p>
          </Col>
        }
        { beer.ibu &&
          <Col xs={4} sm={2} md={2} lg={1}>
            <b>IBU</b>
            <p>{beer.ibu}</p>
          </Col>
        }
        { beer.originalGravity &&
          <Col xs={4} sm={2} md={2} lg={1}>
            <b>OG</b>
            <p>{beer.originalGravity}</p>
          </Col>
        }
      </Row>
    </Grid>
  );
}

export default BeerSubheading;
