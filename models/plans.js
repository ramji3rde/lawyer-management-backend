const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config')

const Plans = new Schema({
    planName: String,
    list: Array,
    price: String,
    firmMembers: Number
})

module.exports = mongoose.model('Plans', Plans)