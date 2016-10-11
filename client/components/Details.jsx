const React = require('react');
const Header = require('./Header');
const { Link } = require('react-router');

class Details extends React.Component {
  render () {
    const params = this.props.params || {};
    const { title, description, stationId } = params;

    return (
      <div className='container'>
        <Header />
        <div className='buoy-info'>
          <h1 className='buoy-title'>{title}</h1>
          <h2 className='buoy-year'>{stationId}</h2>
          <img className='buoy-image' src={`../images/buoy.jpg`} />
          <ul className='buoy-description'>
            {description.map((detail) => (
              <li dangerouslySetInnerHTML={{__html: detail}} key={detail} />
            ))}
          </ul>
        </div>
        <h2 className='header-back'>
          <Link to='/search'>
            Back
          </Link>
        </h2>
      </div>
    );
  }
}

const { object } = React.PropTypes;

Details.propTypes = {
  params: object
};

module.exports = Details;
