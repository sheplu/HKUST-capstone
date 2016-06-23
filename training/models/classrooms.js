var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classroomsSchema = new Schema({
    identifiant: {
        type: String,
        required: true
    },
    name: {
        type: String,
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

var Classrooms = mongoose.model('Classrooms', classroomsSchema);

module.exports = Classrooms;
