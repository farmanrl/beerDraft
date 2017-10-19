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

  open = () => {
    this.setState({ open: !this.state.open })
  }

  isDrafted = (beer, draft) => draft.hasOwnProperty(beer.id);

  moreInformation = () => (
    this.beer.description ||
    this.beer.year ||
    this.beer.servingTemperatureDisplay ||
    this.beer.available ||
    this.beer.glass ||
    this.beer.brewery ||
    this.beer.ingredients
  );

  render() {
    return (
      <Fade in={this.state.show} transitionAppear timeout={this.props.timeout}>
        <Panel
          collapsible
          expanded={this.state.open}
          header={
            <div onClick={() => this.open()}>
            <BeerHeading
              beer={this.beer}
              beerId={this.beer.id}
              moreInformation={this.moreInformation()}
              user={this.props.user}
              isDrafted={this.props.draft ? this.isDrafted(this.beer, this.props.draft) : false}
              open={this.open}
                   />
            </div>
          }
          style={{ width: '90%' }}
        >
          { this.moreInformation() && <BeerBody beer={this.beer}/> }
        </Panel>
      </Fade>
    );
  }
}

export default BeerItem;
