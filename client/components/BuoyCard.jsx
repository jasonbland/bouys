const React = require('react');
const { Link } = require('react-router');
const $ = require('jquery');

class BuoyCard extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      id: this.id,
      steps: []
    };
  }

  // function to save the recipe to the mongo database
  saveBuoy () {
    $.ajax({
      url: '/api/buoys',
      type: 'POST',
      data: { title: this.props.title,
              stationId: this.props.stationId,
              description: this.state.description },
      success: function (data) {
        console.log('success', data);
      }.bind(this),
      error: function () {
        console.log('failure');
      }
    });
  }

  render () {
    return (
      <Link to='/search'>
        <div className='buoy-card'>
          <img src={`./images/buoy.jpg`} className='buoy-card-img' />
          <div className='buoy-card-text'>
            <h3 className='buoy-card-title'>{this.props.title}</h3>
            <h4 className='buoy-card-year'>Station ID: {this.props.stationId}</h4>
            <button className='browse-all' onClick={this.saveBuoy.bind(this)}>Save As Favorite</button>
            <Link to={`/details/${this.props.stationId}`} className='browse-all'>View Conditions</Link>
          </div>
        </div>
      </Link>
    );
  }
}

const { string, array } = React.PropTypes;

BuoyCard.propTypes = {
  title: string.isRequired,
  pubDate: string.isRequired,
  description: array.isRequired,
  stationId: string.isRequired
};

module.exports = BuoyCard;
