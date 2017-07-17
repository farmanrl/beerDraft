import React, { Component } from 'react';
import { Button, Navbar, MenuItem, NavDropdown, Nav, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import BeerList from './BeerList';
import beer from './beer.png';
import breweryDb from './breweryDb.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      type: 'beer',
      searchValue: '',
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  filter = (type) => {
    this.setState({ type });
  }

  render() {
    return (
      <div>
        <Navbar fluid fixedTop collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <div
                style={{
                  display: 'flex',
                  width: 172,
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <img src={beer} style={{ height: '32px', width: 'auto' }} alt="" />
                <h4>Beer Draft</h4>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown eventKey={1} title="Beer" id="basic-nav-dropdown">
                <MenuItem
                  eventKey='beer'
                  onSelect={() => this.filter('beer')}>
                  All Beers
                </MenuItem>
                <MenuItem
                  eventKey='featured'
                  disabled
                  onSelect={() => this.filter('featured')}>
                  Featured Beers
                </MenuItem>
              </NavDropdown>
            </Nav>
            <Navbar.Form pullLeft style={{ maxWidth: 308 }}>
              <FormGroup>
                <InputGroup>
                  <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Search for a beer"
                    onChange={this.handleChange}
                  />
                  <InputGroup.Button>
                    <Button
                      onClick={() => this.setState({ searchValue: this.state.value })}
                    >
                      Search
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </Navbar.Form>
            <Nav pullRight>
              <a href="http://www.brewerydb.com/">
                <img
                  src={breweryDb}
                  style={{
                    height: '54px',
                    width: 'auto',
                    paddingLeft: 12
                  }}
                  alt=""
                />
              </a>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <BeerList
          type={this.state.type}
          searchValue={this.state.searchValue}
          key={[this.state.searchValue, this.state.type]}
        />
      </div>
    );
  }
}


export default App;
