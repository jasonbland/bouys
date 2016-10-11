const React = require('react');
const { Link } = require('react-router');
const $ = require('jquery');

class SavedBuoyCard extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      display: true
    };
  }

  // function used to remove buoy card from page once it's been deleted
  displayFalse () {
    this.setState({
      display: false
    });
  }

  deleteBuoy (id) {
    // ajax request that uses the buoy id to delete the data from the db
    // and the display state is set to false
    $.ajax({
      url: '/api/buoys/' + id,
      type: 'DELETE',
      success: function (data) {
        console.log('delete success');
        this.displayFalse();
      }.bind(this),
      error: function () {
        console.log('delete failure');
      }
    });
  }

  render () {
    if (this.state.display) {
      return (
        <Link to='/favorites'>
          <div className='buoy-card'>
            <img src={`./images/buoy.jpg`} className='buoy-card-img' />
            <div className='buoy-card-text'>
              <h3 className='buoy-card-title'>{this.props.title}</h3>
              <h4 className='buoy-card-year'>Station ID: {this.props.stationId}</h4>
              <button className='browse-all' onClick={this.deleteBuoy.bind(this, this.props.stationId)}>Remove Favorite</button>
              <Link to={`/details/${this.props.stationId}`} className='browse-all'>View Conditions</Link>
            </div>
          </div>
        </Link>
      );
    } else {
      return null;
    }
  }
}

const { string, array } = React.PropTypes;

SavedBuoyCard.propTypes = {
  title: string.isRequired,
  description: array.isRequired,
  stationId: string.isRequired,
  _id: string.isRequired
};

module.exports = SavedBuoyCard;
