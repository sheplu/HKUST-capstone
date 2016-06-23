var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomsSchema = new Schema({
    identifiant: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    created_at: {
      type: Date,
      required: true,
      default: Date.now
    },
    updated_at: {
      type: Date,
      required: true,
      default: Date.now
    }
  }, {
    timestamps: true
});

var Rooms = mongoose.model('Rooms', roomsSchema);

module.exports = Rooms;
