var Schema = mongoose.Schema;

var sportSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        unique: true
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
    },
    isValid: {
      type: Boolean,
      required: true,
      default: true
    }
  }, {
    timestamps: true
});

var Sports = mongoose.model('Sport', sportSchema);

module.exports = Sports;
