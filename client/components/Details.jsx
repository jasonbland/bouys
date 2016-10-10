const React = require('react');
const Header = require('./Header');

class Details extends React.Component {
  render () {
    const params = this.props.params || {};
    const { title, description, pubDate, stationId } = params;

    return (
      <div className='container'>
        <Header />
        <div className='buoy-info'>
          <h1 className='buoy-title'>{title}</h1>
          <h2 className='buoy-year'>{stationId}</h2>
          <h2 className='buoy-year'>{pubDate}</h2>
          <img className='buoy-image' src={`client/images/buoy.jpg`} />
          <ul className='buoy-description'>
            {description.map((detail) => (
              <li dangerouslySetInnerHTML={{__html: detail}} key={detail} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const { object } = React.PropTypes;

Details.propTypes = {
  params: object
};

module.exports = Details;
