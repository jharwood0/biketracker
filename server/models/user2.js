var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    device:{
      devEUI: String,
      uplink: [{
      	battery: {
          type: Number,
          unique: false,
          required: true
        },
      	temperature: {
          type: Number,
          unique: false,
          required: true
        },
      	latitude: {
          type: Number,
          unique: false,
          required: true
        },
      	longitude: {
          type: Number,
          unique: false,
          required: true
        },
      	altitude: {
          type: Number,
          unique: false,
          required: true
        },
      	speed: {
          type: Number,
          unique: false,
          required: true
        },
      	course: {
          type: Number,
          unique: false,
          required: true
        },
      	timestamp: {
          type: Date,
          unique: false,
          required: true
        },
      	ttf: {
          type: Number,
          unique: false,
          required: true
        },
      	satellites: {
          type: Number,
          unique: false,
          required: true
        },
      }]
    }
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
