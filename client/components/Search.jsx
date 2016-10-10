const React = require('react');
const BuoyCard = require('./BuoyCard');
const data = require('../data/data');

const Search = React.createClass({
  getInitialState () {
    return {
      searchTerm: ''
    };
  },
  handleSearchTermEvent (event) {
    this.setState({ searchTerm: event.target.value });
  },
  render () {
    return (
      <div className='container'>
        <header className='header'>
          <h1 className='brand'>Buoy Station Tracker</h1>
          <input value={this.state.searchTerm} className='search-input' type='text' placeholder='Search' onChange={this.handleSearchTermEvent} />
        </header>
        <div className='buoys'>
          {data.buoys
            .filter((buoy) => `${buoy.title} ${buoy.description}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0)
            .map((buoy) => (
              <BuoyCard {...buoy} key={buoy.title} />
          ))}
        </div>
      </div>
    );
  }
});

module.exports = Search;
