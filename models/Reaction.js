const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: setFormat
    }
  },
  {
    toJSON: {
      getters: true,
    },
  }
);


function setFormat(date) {
    return dayjs(date).format('MM/DD/YYYY, hh:mm A');
}

module.exports = reactionSchema;
