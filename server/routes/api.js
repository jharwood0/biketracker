var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//DB
// TODO mongoose promise lib
mongoose.connect('mongodb://admin:admin@ds119508.mlab.com:19508/biketracker');
var Device = require('../models/device');
var Data = require('../models/data');

router.get('/', function(req, res) {
    res.json({
        message: 'Welcome to biketracker-backend!'
    });
});

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

module.exports = router;
