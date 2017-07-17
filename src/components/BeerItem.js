import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

import BeerBody from './BeerBody';
import BeerHeading from './BeerHeading';

class BeerItem extends Component {
  beer = this.props.beer;

  constructor(props) {
    super(props);
    this.state = { open: false }
  }

  shouldRender = () => (
    this.beer.description ||
    this.beer.year ||
    this.beer.servingTemperatureDisplay ||
    this.beer.available ||
    this.beer.glass
  );

  render() {
    return (
      <Panel
        collapsible
        expanded={this.state.open}
        onClick={()=> this.setState({ open: !this.state.open })}
        header={
          <BeerHeading
            beer={this.beer}
            beerId={this.beer.id}
            shouldRender={this.shouldRender}
            tapped={this.props.tapped}
          />
        }
        style={{ width: '90%' }}
      >
        { this.shouldRender() && <BeerBody beer={this.beer} /> }
      </Panel>
    );
  }
}

export default BeerItem;
