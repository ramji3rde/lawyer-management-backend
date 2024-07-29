const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config')
const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
const Footer = new Schema({
  logo: String,
  description: String,
  list: Array,
  list2: Array,
  address: String,
  socialMedia: Array,
  banner: Array,
  header: Array,
  footer: String,
  headerLogo: String,
  faq: Array,
  helpCenter: Array,
  subscriptionTitle: String,
  featuresTitle: String,
  blogTitle: String,
  email: String,
  phone: String,
  welcomeHeader: String,
  welcomeDescription: String,
  welcomePoints: Array,
  hero: Array,
  TestimonialHeading: String,
  TestimonialsDescription: String,
  FAQdescription: String,
  FAQHeading: String,
  heroCarousel: Array,
  welcomeCarousel: Array,
  trail: Number
}, schemaOptions)

module.exports = mongoose.model('Footer', Footer)



