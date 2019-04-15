const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('../helpers/jwtConvert')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class UserController {

  static findAll(req, res) {
    User
      .find()
      .populate('user_id')
      .then(allUser => {
        res.status(200).json(allUser)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static findOne(req, res) {
    User
      .findById(req.params.id)
      .populate('user_id')
      .then(foundUser => {
        res.status(200).json(foundUser)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static register(req, res) {
    User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      })
      .then(newUser => {
        res.status(201).json(newUser)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static webLogin(req, res) {
    User
      .findOne({
        email: req.body.email
      })
      .then(foundUser => {
        if(!foundUser) {
          res.status(401).json('You are not registered')
        } else {
          const verifyPassword = bcrypt.compareSync(req.body.password, foundUser.password)
          if(!verifyPassword) {
            res.status(401).json({
              message: `Wrong password`
            })
          } else {
            let token = jwt.sign({
              id: foundUser._id,
              email: foundUser.email
            }, process.env.JWT_SECRET )
            req.headers.token = token
            res.status(200).json({
              token,
              foundUser
            })
          }
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static googleLogin(req, res) {

    let payload;
    client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
      payload = ticket.getPayload()
      const userId = payload['sub']
      return User
              .findOne({
                email: payload.email
              })
    })
    .then(foundUser => {
      if(!foundUser) {

        return User
                .create({
                  email: payload.email,
                  firstName: payload.name,
                  lastName: payload.name,
                  profilePitcure: payload.picture,
                  password: payload.picture
                })
                .then(registerUser => {
                  const token = jwt.sign({
                    id: registerUser._id,
                    email: registerUser.email
                  }, process.env.GOOGLE_CLIENT_SECRET)
                  res.status(200).json({
                    token,
                    registerUser
                  })
                })
      } else {
        const token = jwt.sign({
          id: foundUser._id,
          email: foundUser.email
        }, process.env.GOOGLE_CLIENT_SECRET)
        res.status(200).json({
          token: token,
          foundUser
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
      console.log(err.message)
    })
  }

}

module.exports = UserController