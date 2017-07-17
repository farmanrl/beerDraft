import React from 'react';
import toTitleCase from 'titlecase';

import BeerLabels from './BeerLabels';

const BeerTitle = (props) => {
  const beer = props.beer;
  return (
    <span className="beer-info">
      <b>{toTitleCase(beer.name.toLowerCase())}</b>
      {'  '}
      <BeerLabels beer={beer} />
      { beer.breweries ?
        <div>
          { beer.breweries[0].website ?
            <a href={beer.breweries[0].website}><strong>{beer.breweries[0].name}</strong></a>
            :
            <strong>{beer.breweries[0].name}</strong>
          }
        </div>
        :
        null
      }
      { beer.style ?
        <p>
          <i>{beer.style.shortName}</i>
        </p>
        :
        null
      }
    </span>
  );
}

export default BeerTitle;
