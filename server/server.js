// server setup
var express = require('express');
var app = express();
var path = require('path');
var db = require('./database.js');
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '../client')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// add buoys to mongo database and retrieve all buoys
app.post('/api/buoys', function (req, res) {
  var inbound = req.body;
  var buoy = new db.Buoy({
    title: inbound.title,
    stationId: inbound.stationId,
    description: inbound.description
  });

  buoy.save(function (err, data) {
    if (err) {
      res.send(err);
    } else {
      db.Buoy.find(function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json(data);
        }
      });
    }
  });
});

// retreive all buoys from db
app.get('/api/buoys', function (req, res) {
  db.Buoy.find({}).exec(function (err, buoys) {
    if (err) {
      res.send(err);
    } else {
      console.log(buoys);
      res.json(buoys);
    }
  });
});

// remove buoy and send back all buoys
app.delete('/api/buoys/:buoy_id', function (req, res) {
  db.Buoy.remove({ stationId: req.params.buoy_id }, function (err, buoy) {
    if (err) {
      res.send(err);
    } else {
      db.Buoy.find(function (err, buoys) {
        if (err) {
          res.send(err);
        } else {
          res.json(buoys);
        }
      });
    }
  });
});

// assign port to server
var port = process.env.PORT || 4568;
app.listen(port);
console.log('Server now listening on port ' + port);

module.exports = app;
