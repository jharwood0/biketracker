// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const passport = require('passport');
const bodyParser = require('body-parser');
const api = require('./server/routes/api');
const auth = require('./server/routes/auth');
const mongoose = require('mongoose');

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
  app.use('/auth', auth);

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
  server.listen(port, () => console.log(`API running on localhost:${port}`));
})
