import React, { Component } from 'react';
import { Panel, Fade } from 'react-bootstrap';

import BeerBody from './BeerBody';
import BeerHeading from './BeerHeading';

class BeerItem extends Component {
  beer = this.props.beer;

  constructor(props) {
    super(props);
    this.state = { show: false }
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ show: true }) }, this.props.timeout)
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
      <Fade in={this.state.show} transitionAppear timeout={this.props.timeout}>
        <Panel
          collapsible
          expanded={this.state.open}
          onClick={()=> this.setState({ open: !this.state.open })}
          header={
            <BeerHeading
              beer={this.beer}
              beerId={this.beer.id}
              shouldRender={this.shouldRender}
              liked={this.props.liked}
            />
          }
          style={{ width: '90%' }}
        >
        { this.shouldRender() && <BeerBody beer={this.beer} /> }
        </Panel>
      </Fade>
    );
  }
}

export default BeerItem;
