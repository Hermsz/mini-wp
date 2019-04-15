const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/hashPassword')

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    validate: [{
        validator: function (input) {
          let regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
          return regex.test(input);
        },
        message: 'Invalid email format!'
      },
      {
        validator: function (input) {
          return mongoose.model('User', userSchema)
            .findOne({
              _id: {
                $ne: this._id
              },
              email: input
            })
            .then(data => {
              if (data) return false
            })
        },
        message: 'Email is already registered!'
      }
    ]
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', function (next) {
  if (this.password) {
    this.password = hashPassword(this.password)
  }
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User