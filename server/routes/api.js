var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config/database');
var jwt = require('jwt-simple');
var User = require('../models/user');
var DeviceModels = require('../models/device');
var Device = DeviceModels.Device;
var Uplink = DeviceModels.Uplink;

/*
GET - /api/users <- returns all users [*]
GET - /api/users/:_id <- returns user [*]
POST - /api/users <- create user [*]
UPDATE - /api/users/:_id <- update the user
DELETE - /api/users/:_id <- delete the user
GET - /api/devices <- returns all devices
GET - /api/devices/:_id <- returns the device
POST - /api/devices <- create device
POST - /api/devices/:_id <- add uplink data
POST - /api/authenticate/

NOTE: somehow need to find a way to trigger a send to the hardware device
POST - /api/devices/:_id/activate
POST - /api/devices/:_id/deactivate
*/

router.get('/', function(req, res) {
  res.json({
    message: 'Welcome to biketracker-backend!'
  });
});

router.route('/users')
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) {
        res.send(err);
      } else {
        res.json(users);
      }
    });
  })
  .post(function(req, res) {
    var newUser = User(req.body);
    newUser.save(function(err, newUser) {
      if (err) {
        res.json({
          success: false,
          msg: 'Failed to create user',
          err: err
        })
      } else {
        res.json({
          success: true,
          msg: 'Successfully saved'
        });
      }
    });
  });
  router.route('/users/authenticate')
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
              tokendata = {};
              tokendata._id = user._id;
              tokendata.username = user.username;
              tokendata.email = user.email;
              var token = jwt.encode(tokendata, config.secret);
              res.json({
                success: true,
                token: token,
                user: tokendata
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

  router.route('/users/getInfo')
        .get(function(req, res){
          if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
              var token = req.headers.authorization.split(' ')[1];
              try{
                var decodedtoken = jwt.decode(token, config.secret);
                return res.json({success: true, msg: 'hello '+decodedtoken.username});
              }catch(err){
                return res.json({success: false, msg: 'invlaid token'});
              }
          }
          else {
              return res.json({success:false, msg: 'No header'});
          }
        });
router.route('/users/:id')
  .get(function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if (err) {
        res.send(err);
      } else {
        res.json(user);
      }
    });
  })
  .put(function(req, res) {
    res.json({
      msg: "Not implemented"
    });
  })
  .delete(function(req, res) {
    res.json({
      msg: "Not Implemented"
    });
  });

router.route('/devices')
  .get(function(req, res) {
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = req.headers.authorization.split(' ')[1];
        try{
          var decodedtoken = jwt.decode(token, config.secret);
          user = decodedtoken._id;
          Device.find({"userId":user}, function(err, devices){
            if (err) {
              res.send(err);
            } else {
              res.json(devices);
            }
          });
        }catch(err){
          console.log(err);
          return res.json({success: false, msg: 'invlaid token'});
        }
    }
  })
  .post(function(req, res) {
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = req.headers.authorization.split(' ')[1];
        try{
          var decodedtoken = jwt.decode(token, config.secret);
          user = decodedtoken._id;
          if (!req.body.devEUI) {
            res.send({
              msg: "incorrect json"
            });
          } else {
            var uplink;
            if (!req.body.uplink) {
              uplink = req.body.uplink;
            } else {
              uplink = [];
            }
            var device = Device({
              "name":req.body.name,
              "devEUI": req.body.devEUI,
              "uplink": uplink,
              "userId":user,
              "activateTime":null
            });
            device.save(function(err, newDevice) {
              if (err) {
                res.send(err);
              } else {
                res.json({
                  msg: "created device"
                })
              }
            })
          }
        }catch(err){
          console.log(err);
          return res.json({success: false, msg: 'invlaid token'});
        }
      }
  })

router.route('/devices/:id')
  .get(function(req, res) {
    Device.findById(req.params.id, function(err, device) {
      if (err) {
        res.send(err);
      } else {
        res.json(device);
      }
    });
  })
  .post(function(req, res) {
    Device.findById(req.params.id, function(err, device) {
      var uplink = Uplink(req.body);
      device.uplink.push(uplink);
      device.save(function(err, device) {
        if (err) {
          res.send(err);
        } else {
          res.json({
            msg: "Successful"
          });
        }
      });
    });
  });
router.route('/devices/:id/uplink')
  .delete(function(req, res) {
    Device.findById(req.params.id, function(err, device) {
      if (err || device === null) {
        res.send(err);
      } else {
        device.uplink = [];
        device.save(function(err, device) {
          if (err) {
            res.send(err);
          } else {
            res.json({
              msg: "Successful"
            });
          }
        });
      }
    });
  });
router.route('/devices/:id/activate')
  .post(function(req, res) {
    Device.findById(req.params.id, function(err, device) {
      if (err) {
        res.send(err);
      } else {
        device.activateTime = Date.now();
        device.save(function(err, device) {
          if (err) {
            res.send(err);
          } else {
            res.json({
              msg: "Successful"
            });
          }
        });
      }
    });
});
router.route('/devices/:id/deactivate')
  .post(function(req, res) {
    Device.findById(req.params.id, function(err, device) {
      if (err) {
        res.send(err);
      } else {
        device.activateTime = null;
        device.save(function(err, device) {
          if (err) {
            res.send(err);
          } else {
            res.json({
              msg: "Successful"
            });
          }
        });
      }
    });
});
module.exports = router;
