const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
      //code from the Xpert Assistant to stop mongoose from generating an "id" field that is redundant and confusing
      transform: function (doc, ret) {
        // Remove the 'id' virtual field from the JSON output
        delete ret.id;
      }
    },
  }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('user', userSchema)

module.exports = User;
