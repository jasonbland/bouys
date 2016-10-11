const React = require('react');
const SavedBuoyCard = require('./SavedBuoyCard');
const Header = require('./Header');
const $ = require('jquery');

class Favorites extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      savedBuoys: [],
      searchTerm: ''
    };
  }

  handleSearchTermChange (searchTerm) {
    this.setState({ searchTerm });
  }

  // get all saved buoys
  componentWillMount () {
    $.ajax({
      url: '/api/buoys',
      type: 'GET',
      success: (data) => {
        console.log('success');
        this.setState({savedBuoys: data});
      },
      error: () => {
        console.log('failure');
      }
    });
  }

  render () {
    return (
      <div className='container'>
        <Header
          handleSearchTermChange={this.handleSearchTermChange}
          searchTerm={this.state.searchTerm}
          buoySearch
        />
        <div className='buoys'>
          {this.state.savedBuoys
            .filter((buoy) => `${buoy.title} ${buoy.description}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0)
            .map((buoy) => (
              <SavedBuoyCard {...buoy} key={buoy.stationId} />
          ))}
        </div>
      </div>
    );
  }
}

module.exports = Favorites;
