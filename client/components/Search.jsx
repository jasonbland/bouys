const React = require('react');
const BuoyCard = require('./BuoyCard');
const { object } = React.PropTypes;

const Search = React.createClass({
  getInitialState () {
    return {
      searchTerm: ''
    };
  },
  propTypes: {
    route: object
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
          {this.props.route.buoys
            .filter((buoy) => `${buoy.title} ${buoy.description}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0)
            .map((buoy) => (
              <BuoyCard {...buoy} key={buoy.stationId} />
          ))}
        </div>
      </div>
    );
  }
});

module.exports = Search;
