var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeslotSchema = new Schema({
    identifiant: {
        type: String,
        required: true
    },
    start_date: {
      type: Date,
      required: true,
      default: Date.now
    },
    end_date: {
      type: Date,
      required: true,
      default: Date.now
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Courses'
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

var TimeSlots = mongoose.model('TimeSlots', timeslotSchema);

module.exports = TimeSlots;
