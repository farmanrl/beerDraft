import React, { Component } from 'react';
import Loading from 'react-loading';
import InfiniteScroll from 'react-infinite-scroller';

import BeerItem from './BeerItem';

const styles = {
  beerList: {
    minHeight: '75vh',
    height: 'auto',
    backgroundColor: '#FFA000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
    paddingTop: 12,
  }
};

const PROXY = 'https://cors-anywhere.herokuapp.com/';
const DB = 'http://api.brewerydb.com/v2';
const API_KEY = '/?key=c7de1e0c05d80f4ccd94015ed58f2392';

class BeerList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      beerItems: [],
      hasMore: true,
      query: {
        p: 1,
        withBreweries: 'Y',
        withSocialAccounts: 'Y',
        withIngredients: 'Y',
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.beerItems === this.state.beerItems
  }

  buildBeerItems = (beerItems) => {
    const query = this.state.query;
    query.p = this.state.query.p + 1;
    this.setState({ query });
    if (beerItems) {
      if (Object.keys(beerItems).length < 50) {
        this.setState({ hasMore: false });
      }
      let timeout = 0;
      Object.keys(beerItems).forEach((beer) => {
        timeout += 30;
        this.setState(prevState => ({
          beerItems: [
            ...prevState.beerItems,
            <BeerItem
              key={beerItems[beer].id}
              beer={beerItems[beer]}
              tapped={false}
              timeout={timeout}
            />
          ],
        }));
      });
    }
  }

  getBeerItems = (requestUrl) => {
    return fetch(requestUrl)
      .then(response => response.json())
      .then(json => json.data)
      .then(beerItems => this.buildBeerItems(beerItems))
      .catch(error => console.log('error', error));
  }

  getRequestUrl = (endpoint, query) => {
    let requestUrl = PROXY + DB + endpoint + API_KEY;
    for (const q in query) {
      if (query[q]) {
        requestUrl += `&${q}=${query[q]}`;
      }
    }
    return requestUrl;
  }

  getSearchUrl = (endpoint, type, query, search) => {
    let requestUrl = PROXY + DB + endpoint + API_KEY;
    for (const q in query) {
      if (query[q]) {
        requestUrl += `&${q}=${query[q]}`;
      }
    }
    requestUrl += `&type=${type}`;
    requestUrl += `&q=${search}`;
    return requestUrl;
  }

  getBeerList = () => {
    let requestUrl = '';
    if (this.props.searchValue) {
      requestUrl = this.getSearchUrl(
        '/search', 'beer',
        this.state.query,
        this.props.searchValue
      );
    } else {
      if (this.props.type === 'featured') {
        requestUrl = this.getRequestUrl(
          '/features',
          this.state.query
        );
      } else {
        requestUrl = this.getRequestUrl(
          '/beers',
          this.state.query,
        );
      }
    }
    this.getBeerItems(requestUrl)
  }

  loaderIcon = (
    <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#FFA000', height: '20vh' }}>
      <Loading type='bubbles' width='20vh'/>
    </div>
  );

  render() {
    return (
      <InfiniteScroll
        pageStart={1}
        loadMore={() => this.getBeerList(this.state.p, 20)}
        hasMore={this.state.hasMore}
        loader={this.loaderIcon}
        threshold={100}
      >
        {this.state.beerItems &&
         <div style={styles.beerList}>
           {this.state.beerItems}
         </div>
        }
      </InfiniteScroll>
    );
  }
}

export default BeerList;
