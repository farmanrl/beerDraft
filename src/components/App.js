import React, { Component } from 'react';
import {
  Button,
  Navbar,
  MenuItem,
  NavDropdown,
  Nav,
  FormGroup,
  FormControl,
  InputGroup,
  Checkbox,
} from 'react-bootstrap';
import { auth, provider, userList } from '../firebase.js';

import BeerList from './BeerList';
import beer from './beer.png';
import breweryDb from './breweryDb.png';
import './App.css';

const styles = {
  controls: {
    width: '100%',
    height: 48,
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'beer',
      endpoint: '/beers',
      inputValue: '',
      searchValue: '',
      user: null,
      draft: {},
      query: {
        withBreweries: 'Y',
        withSocialAccounts: 'Y',
        withIngredients: 'Y',
        order: 'name',
      }
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.getDraft(user);
      }
    });
  }

  getDraft = (user) => {
    const draftList = userList.child(`${user.uid}/draftList`);
    draftList.on('child_added', (data) => {
      this.updateDraft(data.key, data.val());
    });

    draftList.on('child_changed', (data) => {
      this.updateDraft(data.key, data.val());
    });

    draftList.on('child_removed', (data) => {
      this.removeDraft(data.key);
    });
  }

  updateDraft = (key, val) => {
    const draft = this.state.draft;
    draft[key] = val;
    this.setState({ draft });
  }

  removeDraft = (key) => {
    const draft = this.state.draft;
    delete draft[key];
    this.setState({ draft });
  }

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({ user });
        this.getDraft(user);
      });
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({ user: null, draft: {} });
      });
  }

  changeEndpoint = (endpoint) => {
    this.setState({ endpoint });
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
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
                  width: 320,
                  maxWidth: '80%',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <img
                  src={beer}
                  style={{
                    height: '32px',
                    width: 'auto',
                    marginRight: '18px'
                  }}
                  alt="logo"
                />
                <h4 style={{ marginRight: 'auto' }}>Beer Draft</h4>
                { this.state.user ?
                  <Button
                    bsStyle="primary"
                    style={{ marginLeft: 'auto' }}
                    onClick={this.logout}
                  >
                    Logout
                  </Button>
                  :
                  <Button
                    bsStyle="primary"
                    style={{ marginLeft: 'auto' }}
                    onClick={this.login}
                  >
                    Login
                  </Button>
                }
              </div>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form>
              <FormGroup>
                <InputGroup>
                  <FormControl
                    type="text"
                    value={this.state.inputValue}
                    placeholder="Search for a beer"
                    onChange={this.handleChange}
                  />
                  <InputGroup.Button>
                    <Button
                      onClick={() => this.setState({
                          searchValue: this.state.inputValue,
                          endpoint: '/search'
                        })}
                    >
                      Search
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </Navbar.Form>
            <Nav>
              <NavDropdown
                eventKey={1}
                title="Filter Beer"
                id="basic-nav-dropdown"
              >
                <MenuItem
                  eventKey="beer"
                  onSelect={() => this.changeEndpoint('/beers')}
                >
                  All Beers
                </MenuItem>
                <MenuItem
                  eventKey="featured"
                  onSelect={() => this.changeEndpoint('/features')}
                >
                  Featured Beers
                </MenuItem>
                <MenuItem
                  eventKey="beer"
                  disabled={!this.state.user}
                  onSelect={() => this.changeEndpoint('/drafted')}
                >
                  Drafted Beers
                </MenuItem>
                <Nav pullright>
                  <Button pullRight bsStyle="primary">Filter</Button>
                </Nav>
              </NavDropdown>
            </Nav>
            <Checkbox inline>
              Checkbox with success
            </Checkbox>
            <Checkbox inline>
              Checkbox with error
            </Checkbox>
            <Nav pullRight>
              <a href="http://www.brewerydb.com/">
                <img
                  src={breweryDb}
                  style={{
                    height: '54px',
                    width: 'auto',
                    paddingLeft: 12
                  }}
                  alt="powered-by-brewerydb"
                />
              </a>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <BeerList
          type={this.state.type}
          endpoint={this.state.endpoint}
          searchValue={this.state.searchValue}
          draft={this.state.draft}
          user={this.state.user}
          key={[
            this.state.searchValue,
            this.state.type,
            this.state.endpoint,
            this.state.user
          ]}
        />
      </div>
    );
  }
}


export default App;
