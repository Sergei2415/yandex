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
        return /(https?:\/\/(www\.)?(([А-Яа-яA-Za-z0-9-_]\/*\?*=*)+\.[a-z]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(\/?[A-Za-zА-Яа-я0-9-_\/]{1,})?(:\d{1,5})?(\/[A-Za-zА-Яа-я0-9-_\/]{1,})?#?|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?#?)|[A-Za-z]*\.[A-Za-z0-9]{2,20}(:\d{1,5})?(\/?[A-Za-zА-Яа-я0-9-_\/]{1,})?(:\d{1,5})?#?/.test(v);
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
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
module.exports = mongoose.model('card', cardSchema);
