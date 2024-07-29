const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config')
const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
const Blogs = new Schema({
    description: String,
    rating: Number,
    author: String,
    image: String,
    designation : String
}, schemaOptions)

module.exports = mongoose.model('testimonials', Blogs)