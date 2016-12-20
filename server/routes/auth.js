var express = require('express');
var User = require('../models/user');
var config = require('../config/database');
var jwt = require('jwt-simple');
var router = express.Router();
router.route('/authenticate')
  .post(function(req, res) {
    //auth user
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.json({
          success: false,
          msg: 'Authentication failed, User not found'
        });
      } else {
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            var token = jwt.encode(user, config.secret);
            res.json({
              success: true,
              token: token,
              user: user
            });
          } else {
            return res.json({
              success: false,
              msg: 'Authenticaton failed, wrong password.'
            });
          }
        })
      }

    })
  });

router.route('/getInfo')
      .get(function(req, res){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1];
            var decodedtoken = jwt.decode(token, config.secret);
            return res.json({success: true, msg: 'hello '+decodedtoken.username});
        }
        else {
            return res.json({success:false, msg: 'No header'});
        }
      });
module.exports = router;
