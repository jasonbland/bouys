const React = require('react');
const BuoyCard = require('./BuoyCard');
const Header = require('./Header');
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
  handleSearchTermChange (searchTerm) {
    this.setState({ searchTerm });
  },
  render () {
    return (
      <div className='container'>
        <Header
          handleSearchTermChange={this.handleSearchTermChange}
          searchTerm={this.state.searchTerm}
          buoySearch
        />
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
