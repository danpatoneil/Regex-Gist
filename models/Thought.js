const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dayjs = require('dayjs');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
    createdAt: {
        type: Date,
        default: Date.now,
        get: setFormat,
    }
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
      //code from the Xpert Assistant to stop mongoose from generating an "id" field that is redundant and confusing
      transform: function (doc, ret) {
        // Remove the 'id' virtual field from the JSON output
        delete ret.id;
      }
    },
  }
);

function setFormat(date) {
    return dayjs(date).format('MM/DD/YYYY, hh:mm A');
}

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
