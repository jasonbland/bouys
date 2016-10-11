const React = require('react');
const { Link } = require('react-router');

const Landing = () => (
  <div className='home-info'>
    <h1 className='title'>Buoy Station Tracker</h1>
    <Link to='/search' className='browse-all'>Browse Stations (40N 73W 100 Radius)</Link><br />
    <Link to='/favorites' className='browse-all'>Browse Favorites</Link>
  </div>
);

module.exports = Landing;
