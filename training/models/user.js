var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var externalSchema = new Schema({
  mail: {
      type: String,
      required: true,
      unique: true
  }
});

var userSchema = new Schema({
    identifiant: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "admin"
    },
    /*external: {
      externalSchema
    },*/
    created_at: {
      type: Date,
      required: true,
      default: Date.now
    },
    updated_at: {
      type: Date,
      required: true,
      default: Date.now
    },
    isValid: {
      type: Boolean,
      required: true,
      default: true
    }
  }, {
    timestamps: true
});

var Users = mongoose.model('User', userSchema);

module.exports = Users;
