import React, { Component } from 'react';
import Loading from 'react-loading';
import InfiniteScroll from 'react-infinite-scroller';
import querystring from 'querystring';
import BeerItem from './BeerItem';

const styles = {
  beerList: {
    minHeight: '100vh',
    height: 'auto',
    backgroundColor: '#FFA000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
    paddingTop: 12,
  }
};

const LoaderIcon = (props) => (
  <div
    style={{
        display: 'flex',
        height: '20vh',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
      }}
  >
    <Loading type='bubbles' width='20vh'/>
  </div>
);

const PROXY = 'https://cors-anywhere.herokuapp.com/';
const DB = 'http://api.brewerydb.com/v2';
const API_KEY = '/?key=c7de1e0c05d80f4ccd94015ed58f2392&';

class BeerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beerItems: [],
      hasMore: true,
      loading: true,
      type: null,
      p: 1,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.beerItems.length !== this.state.beerItems.length
  }

  buildBeerItems = (beerData) => {
    if (beerData) {
      let timeout = 0;
      Object.values(beerData).forEach((beer) => {
        timeout += 30;
        this.setState(prevState => ({
          beerItems: [
            ...prevState.beerItems,
            <BeerItem
              key={beer.id}
              beer={beer}
              user={this.props.user}
              timeout={timeout}
              draft={this.props.draft}
            />
          ],
        }));
      });
    }
  }

  fetchBeerData = (requestUrl) => {
    return fetch(requestUrl)
      .then(response => response.json())
      .then(json => json.data)
      .then((beerData) => {
        const p = this.state.p + 1;
        if (Object.keys(beerData).length < 50) {
          this.setState({ p, hasMore: false, loading: false });
        } else {
          this.setState({ p, hasMore: true, loading: false });
        }
        if (this.props.endpoint === '/features') {
          const featuredBeerData = {};
          Object.values(beerData).forEach((entry) => {
            const beerId = entry.beerId;
            const beer = entry.beer;
            featuredBeerData[beerId] = beer;
          });
          this.buildBeerItems(featuredBeerData);
        } else {
          this.buildBeerItems(beerData);
        }
      })
      .catch(error => console.log('error', error));
  }

  getRequestUrl = (endpoint, p, query, type, q) => {
    let requestUrl = PROXY + DB + endpoint + API_KEY;
    const queryString = querystring.stringify(query);
    requestUrl += queryString;
    requestUrl += `&p=${p}`;
    if (endpoint === '/search') {
      requestUrl += `&type=${type}`;
      requestUrl += `&q=${q}`;
    }
    return requestUrl;
  }

  getBeerData = (endpoint, p, query, type, q, draft) => {
    let beerData = null;
    let requestUrl = null;
    switch (endpoint) {
      case '/search':
        requestUrl = this.getRequestUrl(endpoint, query, type, q);
        beerData = this.fetchBeerData(requestUrl);
        break;
      case '/beers':
        requestUrl = this.getRequestUrl(endpoint, query, type, q);
        beerData = this.fetchBeerData(requestUrl);
        break;
      case '/features':
        requestUrl = this.getRequestUrl(endpoint, query, type, q);
        beerData = this.fetchBeerData(requestUrl);
        break;
      case '/drafted':
        beerData = draft;
        this.buildBeerItems(beerData);
        this.setState({ hasMore: false, loading: false });
        break;
      default:
        break;
    }
  }

  getBeerList = (endpoint, query, type, q, draft) => {
    this.setState({ hasMore: false, loading: true });
    this.getBeerData(endpoint, query, type, q, draft);
  }

  render() {
    return (
      <InfiniteScroll
        pageStart={1}
        loadMore={() => this.getBeerList(
          this.props.endpoint,
          this.state.p,
          this.props.query,
          this.props.type,
          this.props.searchValue,
          this.props.draft,
        )}
        hasMore={this.state.hasMore}
        threshold={120}
      >
        <div style={styles.beerList}>
          {this.state.beerItems}
        </div>
        { this.state.loading &&
          <LoaderIcon />
        }
      </InfiniteScroll>
    );
  }
}

export default BeerList;
