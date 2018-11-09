'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = Schema({
    email: String,
    name: String,
    password: String,
    dateOfRegistration: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)