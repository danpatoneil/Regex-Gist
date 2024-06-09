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
        get: function(){
            return dayjs(this.createdAt).format('MM/DD/YYYY, hh:mm A');
        }
    }
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = reactionSchema;
