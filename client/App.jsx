const React = require('react');
const ReactDOM = require('react-dom');
const Landing = require('./components/Landing');
const Search = require('./components/Search');
const Favorites = require('./components/Favorites');
const Layout = require('./components/Layout');
const Details = require('./components/Details');
const $ = require('jquery');
const { Router, Route, IndexRoute, hashHistory } = require('react-router');

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      buoys: [],
      display: false
    };
  }

  componentWillMount () {
    let temp = [];
    let feed = 'http://www.ndbc.noaa.gov/rss/ndbc_obs_search.php?lat=40N&lon=73W&radius=100';

    $.ajax(feed, {
      accepts: {
        xml: 'application/rss+xml'
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      dataType: 'xml',
      success: function (data) {
        $(data).find('item').each(function () {
          var el = $(this);
          var title = el.find('title').text();
          var stationId = el.find('title').text().substring(8, 13);
          var pubDate = el.find('pubDate').text();
          var description = el.find('description').text()
                            .split('\n')
                            .reduce(function (results, elem) {
                              elem = elem.trim();
                              if (elem) {
                                results.push(elem);
                              }
                              return results;
                            }, []);
          temp.push({ title: title, stationId: stationId, pubDate: pubDate, description: description });
        });
        this.setState({buoys: temp, display: true});
      }.bind(this),
      error: function () {
        console.log('noaa feed failure');
      }
    });
  }

  assignBuoy (nextState, replace) {
    console.log(this.state.buoys);
    let buoyArray = this.state.buoys.filter((buoy) => buoy.stationId === nextState.params.id);

    if (buoyArray.length < 1) {
      return replace('/');
    }

    Object.assign(nextState.params, buoyArray[0]);
    return nextState;
  }

  render () {
    if (this.state.display) {
      return (
        <Router history={hashHistory}>
          <Route path='/' component={Layout}>
            <IndexRoute component={Landing} />
            <Route path='/search' component={Search} buoys={this.state.buoys} />
            <Route path='/favorites' component={Favorites} buoys={this.state.buoys} />
            <Route path='/details/:id' component={Details} onEnter={this.assignBuoy.bind(this)} />
          </Route>
        </Router>
      );
    } else {
      return null;
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
