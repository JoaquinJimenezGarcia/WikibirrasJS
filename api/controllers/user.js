'use strict'

var User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')
var jwt = require('../services/jwt')
const fs = require('fs')
const path = require('path')

function login(req, res){
    var params = req.body

    var email = params.email
    var password = params.password
    
    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err) {
            res.status(500).send({message: 'Error in the API.'})
        } else {
            if(!user) {
                res.status(404).send({message: 'The user doesn\'t exist.'})
            } else {
                bcrypt.compare(password, user.password, function(err, check){
                    if (check) {
                        if(params.gethash){
                            res.status(200).send({
                                token: jwt.createToken(user)
                            })
                        } else {
                            res.status(200).send({user})
                        }
                    } else {
                        res.status(404).send({message: 'Wrong password.'})
                    }
                })
            }
        }
    })
}

function register(req, res){
    var user = new User()
    var params = req.body

    user.email = params.email
    user.name = params.name

    User.findOne({email: user.email.toLowerCase()}, (err, userExisting) => {
        if(err) {
            res.status(500).send({message: 'Error in the API.'})
        } else {
            if(!userExisting) {
                if (params.password) {
                    bcrypt.hash(params.password, null, null, function(err, hash) {
                    user.password = hash
            
                        if (user.email != null) {
                            user.save((err, userStored) => {
                                if (err) {
                                    res.status(500).send({message: 'Error registering the user'})
                                } else {
                                    if (!userStored) {
                                        res.status(404).send({message: 'The user hasn\'t been registered'})
                                    } else {
                                        res.status(200).send({user: userStored})
                                    }
                                }
                            })
                        } else {
                            res.status(500).send({message: 'Missing params'})
                        }
                    })
                } else {
                    res.status(500).send({message: 'Select a password'})
                }
            } else {
                res.status(404).send({message: 'This email is currently in use.'})
            }
        }
    })
}

/*function update(req, res) {
    var userId = req.params.id 
    var update = req.body

    if(userId != req.user.sub) {
        return res.status(500).send({message: 'You cannot update other user\'s credentials.'})
    }

    /*if(update.email){
        return res.status(500).send({message: 'You cannot update your email yet.'})
    }*/

    /*if (update.password) {
        bcrypt.hash(update.password, null, null, function(err, hash) {
            update.password = hash
            toUpdate(req, res, update, userId)
        })
    } else {
        toUpdate(req, res, update, userId)
    }
}

function toUpdate(req, res, update, userId){
    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err){
            res.status(500).send({message: 'Error updating user.'})
        } else {
            if(!userUpdated) {
                res.status(404).send({message: 'Internal error updating the user.'})
            } else {
                res.status(200).send({user: userUpdated})
            }
        }
    })
}*/

module.exports = {
  register,
  login, 
  //update
}