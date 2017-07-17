import React, { Component } from 'react';
import { Button, Navbar, MenuItem, NavDropdown, NavItem, Nav, FormGroup, FormControl, InputGroup, ControlLabel } from 'react-bootstrap';
import BeerList from './BeerList';
import beer from './beer.png';
import breweryDb from './breweryDb.png';
import './App.css';

const req = fetch('http://api.brewerydb.com/v2/beers/?key=c7de1e0c05d80f4ccd94015ed58f2392&p=2&withBreweries=Y&withIngredients=Y&withSocialAccounts=Y');
console.log(req);

class App extends Component {
  render() {
    return (
      <div>
        <Navbar fluid fixedTop collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <div style={{ display: 'flex', width: 172, justifyContent: 'space-between', alignItems: 'center' }}>
                <img src={beer} style={{ height: '32px', width: 'auto' }} alt="" />
                <h4>Beer Draft</h4>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown eventKey={1} title={this.state.filter} id="basic-nav-dropdown">
                <MenuItem eventKey={1.1} onSelect={() => this.filterAll()}>All Beers</MenuItem>
                <MenuItem eventKey={1.2} onSelect={() => this.filterFeatured()}>Featured Beers</MenuItem>
              </NavDropdown>
            </Nav>
            <Navbar.Form pullLeft style={{ maxWidth: 308 }}>
              <FormGroup>
                <InputGroup>
                  <FormControl type="text" />
                  <InputGroup.Button>
                    <Button>Search</Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </Navbar.Form>
            <Nav pullRight>
              <Button onClick={() => this.login()}>Login</Button>
              <a href="http://www.brewerydb.com/">
                <img src={breweryDb} style={{ height: '54px', width: 'auto', paddingLeft: 12 }} alt="" />
              </a>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div style={{ marginBottom: 54 }} />
        <div style={{ backgroundColor: '#AA0000', padding: 12 }}>
          <h4 style={{ color: 'white', margin: 0 }}>
            <strong>{this.state.filter} on tap...</strong>
          </h4>
        </div>
        <BeerList />
      </div>
    );
  }
}


export default App;
