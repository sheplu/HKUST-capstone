var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var coursesSchema = new Schema({
    identifiant: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rooms'
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classrooms'
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

var Courses = mongoose.model('Courses', coursesSchema);

module.exports = Courses;
