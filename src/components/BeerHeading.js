import React from 'react';
import { Media, Button } from 'react-bootstrap';
import BeerIcon from './BeerIcon';
import BeerSubheading from './BeerSubheading';
import { userList } from '../firebase.js';

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

  const updateDraft = (id, beer) => {
    const draftList = userList.child(props.user.uid + '/draftList')
    if (beer) {
      const entry = {};
      entry[id] = beer;
      draftList.update(entry);
    } else {
      draftList.child(id).remove();
    }
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
      <div onClick={() => props.open()}>
        { props.moreInformation && <i>more information...</i> }
        { props.user && !props.isDrafted &&
          <Button
            onClick={() => updateDraft(props.beerId, beer)}
            bsStyle="primary"
            style={{ float: 'right' }}
          >
            Draft
          </Button>
        }
        { props.user && props.isDrafted &&
          <Button
            onClick={() => updateDraft(props.beerId, null)}
            bsStyle="primary"
            style={{ float: 'right' }}
          >
            Undraft
          </Button>
        }
      </div>
    </Media>
  );
};

export default BeerHeading;
