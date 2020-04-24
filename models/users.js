const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /^https?:(www\.)?\/((\/[А-Яа-яA-Za-z0-9-_\?=\.]{2,})(:\d{1,5})?|(\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d{1,5})?){1}(\/[А-Яа-яA-Za-z0-9-_\?=\.&%]{1,})*(\.[А-Яа-яA-Za-z0-9-_=\.]{1,10})?\#?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
    required: true,
  },
});
module.exports = mongoose.model('user', userSchema);
