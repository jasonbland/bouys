const React = require('react');
const { Link } = require('react-router');

const Landing = () => (
  <div className='home-info'>
    <h1 className='title'>Buoy Station Tracker</h1>
    <input className='search' type='text' placeholder='Search' />
    <Link to='/search' className='browse-all'> or Browse</Link>
  </div>
);

module.exports = Landing;
