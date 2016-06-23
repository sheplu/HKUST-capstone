var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var studentSchema = new Schema({
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
    email: {
      type: String,
      required: true
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classrooms'
    },
    //courses: [ courses ],
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

var Students = mongoose.model('Students', studentSchema);

module.exports = Students;
