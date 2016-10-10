const React = require('react');
const ReactDOM = require('react-dom');
const Landing = require('./components/Landing');
const Search = require('./components/Search');
const Layout = require('./components/Layout');
const { Router, Route, IndexRoute, hashHistory } = require('react-router');

const App = () => (
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Landing} />
      <Route path='/search' component={Search} />
    </Route>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app'));
