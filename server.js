// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const passport = require('passport');
const bodyParser = require('body-parser');
const api = require('./server/routes/api');
const mongoose = require('mongoose');

/* TODO make this neater */
var ttn = require('ttn');
var ttnConfig = require('./server/config/ttnConfig');
var DeviceModels = require('./server/models/device');
var Device = DeviceModels.Device;
var Uplink = DeviceModels.Uplink;

var config = require('./server/config/database');
mongoose.connect(config.database);
mongoose.connection.on('open', function() {
      const app = express();

      // Parsers for POST data
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({
        extended: false
      }));

      // JWT setup and auth
      app.use(passport.initialize());
      require('./server/config/passport')(passport);

      // Point static path to dist
      app.use(express.static(path.join(__dirname, 'dist')));

      // Set our api routes
      app.use('/api', api);

      // Catch all other routes and return the index file
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
      });

      /**
       * Get port from environment and store in Express.
       */
      const port = process.env.PORT || '3000';
      app.set('port', port);

      /**
       * Create HTTP server.
       */
      const server = http.createServer(app);

      /**
       * Listen on provided port, on all network interfaces.
       */
      server.listen(port, () => console.log('[DEBUG]', 'API running on localhost:${port}'));

      /* nodeTTN */
      var client = new ttn.Client(ttnConfig.endpoint, ttnConfig.appEUI, ttnConfig.accessKey);

      client.on('connect', function() {
        console.log('[DEBUG]', 'Connected to TTN endpoint');
      });

      client.on('error', function(err) {
        console.error('[ERROR]', err.message);
      });

      client.on('activation', function(e) {
        console.log('[INFO] ', 'Activated: ', e.devEUI);
      });

      client.on('uplink', function(msg) {
        var uplink = new Uplink(msg.fields);
        // get device and see if it exists
        console.log('[INFO]', 'Looking for ', msg.devEUI);
        Device.findOne({
          'devEUI': msg.devEUI
        }, function(err, device) {
          if (device == null) {
            console.log('[INFO]', 'Could not find devEUI...');
            var device = new Device();
            device.devEUI = msg.devEUI;
            device.uplink = [];
            device.uplink.push(uplink);
            device.save(function(err) {});
          }
          device.uplink.push(uplink);
          device.save(function(err) {
            if (err) {
              console.log('[DEBUG]', err);
            } else {
              console.log('[INFO]', "Succeeded!");
            }
          })
        });
      });
    });
