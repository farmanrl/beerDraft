import React from 'react';
const BeerBody = (props) => {
  const beer = props.beer;

  return (
    <div>
      <h4>Beer Information</h4>
      { beer.description &&
        <div>
          <strong>Description</strong>
          <p>{ beer.description }</p>
        </div>
      }
      { beer.style &&
        <div>
          <strong>Style</strong>
          <p><i>{ beer.style.name }</i></p>
          <p>{ beer.style.description }</p>
        </div>
      }
      { beer.year &&
        <div>
          <strong>Year of Vintage</strong>
          <p>{ beer.year }</p>
        </div>
      }
      { beer.servingTemperatureDisplay &&
        <div>
          <strong>Serving Temperature</strong>
          <p>{ beer.servingTemperatureDisplay }</p>
        </div>
      }
      { beer.available &&
        <div>
          <strong>{ beer.available.name }</strong>
          <p>{ beer.available.description }</p>
        </div>
      }
      { beer.isOrganic === 'Y' &&
        <div>
          <strong>Organic</strong>
          <p>This beer is certified organic.</p>
        </div>
      }
      { beer.glass &&
      <div>
        <strong>Glassware</strong>
        <p>{ beer.glass.name }</p>
      </div>
      }
      { beer.ingredients && <hr /> }
      { beer.ingredients && <h4>Ingredients</h4> }
      { beer.ingredients &&
        Object.keys(beer.ingredients).map((ingredient) => {
          const iList = beer.ingredients[ingredient]
          const ingredientList = Object.keys(iList).map((i) => (
            <p>
              {
                iList[i].name.charAt(0).toUpperCase() + iList[i].name.slice(1)
              }
            </p>
          ));
          return (
            <div>
              <strong>{ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</strong>
              {ingredientList}
            </div>
          );
        })
      }
      { beer.socialAccounts && <hr /> }
      { beer.socialAccounts && <h4>Social Accounts</h4> }
      { beer.socialAccounts &&
        Object.keys(beer.socialAccounts).map((account) => (
          <div>
            <strong>{beer.socialAccounts[account].socialMedia.name}</strong>
            <a href={beer.socialAccounts[account].socialMedia.link}>
              <p>{beer.socialAccounts[account].link}</p>
            </a>
          </div>
        ))
      }
      { beer.breweries && <hr /> }
      { beer.breweries && <h4>Brewery</h4> }
      { beer.breweries[0] &&
        <div>
          { beer.breweries[0].website ?
            <a href={ beer.breweries[0].website }>
              <strong>{ beer.breweries[0].name }</strong>
            </a>
            :
            <strong>{ beer.breweries[0].name }</strong>
          }
          <br />
          { beer.breweries[0].locations &&
            <span>
              { beer.breweries[0].locations[0].locality },
              { ' ' }
              { beer.breweries[0].locations[0].country.displayName }
              <br />
            </span>
          }
          { beer.breweries[0].locations &&
            <i>
              { beer.breweries[0].locations[0].locationTypeDisplay }
              { beer.breweries[0].established &&
                <span> - Est. { beer.breweries[0].established }</span> }
              <br />
            </i>
          }
          <br />
          { beer.breweries[0].description &&
            <p>{ beer.breweries[0].description }</p> }
        </div>
      }
    </div>
  );
}

export default BeerBody;
