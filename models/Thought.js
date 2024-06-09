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
        get: function(){
            return dayjs(this.createdAt).format('MM/DD/YYYY, hh:mm A');
        }
    }
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
