const React = require('react');
const { Link } = require('react-router');

const BuoyCard = (props) => (
  <Link to={`/details/${props.stationId}`}>
    <div className='buoy-card'>
      <img src={`client/images/buoy.jpg`} className='buoy-card-img' />
      <div className='buoy-card-text'>
        <h3 className='buoy-card-title'>{props.title}</h3>
        <h4 className='buoy-card-year'>{props.pubDate}</h4>
        <ul className='buoy-card-description'>
          {props.description.map((detail) => (
            <li dangerouslySetInnerHTML={{__html: detail}} key={detail} />
          ))}
        </ul>
      </div>
    </div>
  </Link>
);

const { string, array } = React.PropTypes;

BuoyCard.propTypes = {
  title: string.isRequired,
  pubDate: string.isRequired,
  description: array.isRequired,
  stationId: string.isRequired
};

module.exports = BuoyCard;
