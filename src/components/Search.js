import React, { Component } from 'react';

const endpointUrl = 'http://api.brewerydb.com/v2/search?key=1536958ba7964bef1d78271de47b3554';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    console.log('Search...');
    const requestUrl = endpointUrl + '&q=' + this.state.value;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

}
export default Search;
