var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

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
    if ((!req.body.username) || (!req.body.password) || (!req.body.email) || (!req.body.devices)) {
      res.json({
        success: false,
        msg: 'invalid json'
      });
    } else {
      var error = false;
      var errors = [];

      var newUser = User({
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "devices": req.body.devices
      });

      console.log(newUser);
      newUser.devices.forEach(function(device) {
        Device.findOne({
          "devEUI": device
        }, function(err, foundDevice) {
          if (foundDevice == null) {
            console.log("Creating device");
            var newDevice = Device({
              "devEUI": device,
              "uplink": []
            });
            newDevice.save(function(err, newDevice) {
              if (err) {
                error = true;
                errors.push("Could not create device");
              }
            });
          }
        });
      });
      if (error) {
        res.json({
          success: false,
          msg: 'Failed to create user',
          err: err
        })
      } else {
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
      }
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
    Device.find(function(err, devices) {
      if (err) {
        res.send(err);
      } else {
        res.json(devices);
      }
    })
  })
  .post(function(req, res) {
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
        "devEUI": req.body.devEUI,
        "uplink": uplink
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

    /*
    router.route('/devices')
        .post(function(req, res) {
            var device = new Device(); // create a new instance of the Device model
            device.devEUI = req.body.devEUI; // set the devices devEUI (comes from the request)
            var location = new Location();
            location.device = device._id;
            location.longitude = -2;
            location.latitude = -1;
            location.save(function(errr){});

            device.save(function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({
                        message: 'Device created!'
                    });
                }
            });
        })
        .get(function(req, res) {
            Device.find(function(err, devices) {
                if (err)
                    res.send(err);
                res.json(devices);
            });
        });

    router.route('/devices/:device_id')
        .get(function(req, res) {
            Device.findById(req.params.device_id, function(err, device) {
                if (err)
                    res.send(err);
                res.json(device);
            });
        })
        .put(function(req, res) {
            Device.findById(req.params.devEUI, function(err, device) {
                if (err)
                    res.send(err);
                device.devEUI = req.body.devEUI;
                device.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({
                        message: 'Device updated!'
                    });
                });

            });
        })
        .delete(function(req, res) {
            Device.remove({
                _id: req.params.devEUI
            }, function(err, device) {
                if (err)
                    res.send(err);
                res.json({
                    message: 'Successfully deleted'
                });
            });
    });

    router.route('/devices/:device_id/datas')
        .get(function(req, res){
            Data.find({}).where('device', req.params.device_id).exec(function(err, locations){
                res.json(locations);
            });
        });

    router.get('/datas', function(req, res) {
        Data.find(function(err, locations){
            if(err){
                res.send(err);
            }
            res.json(locations);
        });
    });
    */

    module.exports = router;
