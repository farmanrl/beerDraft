import React from 'react';
import { Media, Button } from 'react-bootstrap';
import BeerIcon from './BeerIcon';
import BeerSubheading from './BeerSubheading';

const BeerHeading = (props) => {
  const beer = props.beer;

  const getSrm = () => {
    if (beer.srmId) {
      return beer.srmId;
    } else if (beer.style) {
      if (beer.style.srmMin && beer.style.srmMax) {
        return (
          (parseInt(beer.style.srmMin, 10) + parseInt(beer.style.srmMax, 10)) / 2
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  const tapBeer = (uid, key) => {
    alert('This beer is now tapped!');
  }

  const getGlasswareId = () => beer.glasswareId ? beer.glasswareId : null

  return (
    <Media>
      <Media.Left align="top">
        <BeerIcon srm={getSrm()} glasswareId={getGlasswareId()} />
      </Media.Left>
      <Media.Body>
        <BeerSubheading beer={beer} />
      </Media.Body>
      <hr />
      { props.shouldRender() && <i>more information...</i> }
      { props.user &&
        <Button
          onClick={() => tapBeer(props.user.uid, props.beerId)}
          bsStyle="primary"
          style={{ float: 'right' }}
        >
          Tap
        </Button>
      }
    </Media>
  );
};

export default BeerHeading;
