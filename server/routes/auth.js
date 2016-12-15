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
              token: token
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

router.route('/addUser')
  .post(function(req, res) {
    if ((!req.body.username) || (!req.body.password)) {
      console.log(req.body.username);
      console.log(req.body.password);

      res.json({
        success: false,
        msg: 'Enter all values'
      });
    } else {
      var newUser = User({
        username: req.body.username,
        password: req.body.password
      });

      newUser.save(function(err, newUser) {
        if (err) {
          res.json({
            success: false,
            msg: 'Failed to save'
          })
        } else {
          res.json({
            success: true,
            msg: 'Successfully saved'
          });
        }
      })
    }
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
