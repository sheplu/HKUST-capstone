var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var markSchema = new Schema({
    identifiant: {
        type: String,
        required: true
    },
    mark: {
        type: Number,
        required: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Students'
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

var Marks = mongoose.model('Marks', markSchema);

module.exports = Marks;
