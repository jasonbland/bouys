const React = require('react');
const { Link } = require('react-router');
const { func, bool, string } = React.PropTypes;

const Header = React.createClass({
  propTypes: {
    handleSearchTermChange: func,
    showSearch: bool,
    searchTerm: string
  },
  handleSearchTermEvent (event) {
    this.props.handleSearchTermChange(event.target.value);
  },
  render () {
    return (
      <header className='header'>
        <h1 className='brand'>
          <Link to='/' className='brand-link'>
            Buoy Station Tracking
          </Link>
        </h1>
        <input type='text' className='search-input' placeholder='Live Filter' value={this.props.searchTerm} onChange={this.handleSearchTermEvent} />
      </header>
    );
  }
});

module.exports = Header;
