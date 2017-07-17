import React from 'react';
import { Label } from 'react-bootstrap';

const BeerLabels = (props) => {
  const beer = props.beer;

  return (
    <span>
      { beer.statusDisplay === 'Verified' &&
        <Label bsStyle="primary">Verified</Label>
      }
      {'  '}
      { beer.availableId === 3 &&
        <Label bsStyle="danger">{beer.available.name}</Label>
      }
      { beer.availableId === 1 &&
        <Label bsStyle="info">{beer.available.name}</Label>
      }
      { beer.availableId !== 1 &&
        beer.availableId !== 3 &&
        beer.available &&
        <Label bsStyle="warning">{beer.available.name}</Label>
      }
      {'  '}
      { beer.isOrganic === 'Y' &&
        <Label bsStyle="success">Organic</Label>
      }
    </span>
  );
}

export default BeerLabels;
