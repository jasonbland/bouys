const React = require('react');
const ReactDOM = require('react-dom');
const Landing = require('./components/Landing');
const Search = require('./components/Search');
const Favorites = require('./components/Favorites');
const Layout = require('./components/Layout');
const Details = require('./components/Details');
const { Router, Route, IndexRoute, browserHistory } = require('react-router');
const { buoys } = require('./data/data');

const App = React.createClass({
  assignBuoy (nextState, replace) {
    const buoyArray = buoys.filter((buoy) => buoy.stationId === nextState.params.id);

    if (buoyArray.length < 1) {
      return replace('/');
    }

    Object.assign(nextState.params, buoyArray[0]);
    return nextState;
  },
  render () {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Landing} />
          <Route path='/search' component={Search} buoys={buoys} />
          <Route path='/favorites' component={Favorites} buoys={buoys} />
          <Route path='/details/:id' component={Details} onEnter={this.assignBuoy} />
        </Route>
      </Router>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
