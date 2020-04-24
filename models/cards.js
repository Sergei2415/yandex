/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        return /^https?:(www\.)?\/((\/[А-Яа-яA-Za-z0-9-_\?=\.]{2,})(:\d{1,5})?|(\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d{1,5})?){1}(\/[А-Яа-яA-Za-z0-9-_\?=\.&%]{1,})*(\.[А-Яа-яA-Za-z0-9-_=\.]{1,10})?\#?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('card', cardSchema);
