const testimonials = require('../../../models/testimonials')

exports.createTestimonials = (req, res) => {
  const { author, description, image, rating, designation } = req.body
  const Testimonials = new testimonials({
    author,
    description,
    rating,
    image,
    designation
  })
  Testimonials.save().then(data => {
    res.status(200).json({ status: true, message: "Testimonials list Saved", data })
  }).catch(error => {
    res.status(400).json({ status: false, message: error })

  })
}

exports.deleteTestimonial = (req, res) => {
  // console.log(req.params.id)
  testimonials.findByIdAndRemove(req.params.id).
    then(data => {
      res.status(200).json({ status: true, message: "Testimonial Removed", data })

    }).catch(error => {
      res.status(400).json({ status: false, message: error })
    })
}

//Show all 
exports.showAll = (req, res) => {

  testimonials.find({}).
    then(data => {
      res.status(200).json({ status: true, message: "Testimonials list fetched", data })

    }).catch(error => {
      res.status(400).json({ status: false, message: error })

    })
}

exports.editTestimonials = (req, res) => {

  testimonials.findByIdAndUpdate(req.params.id, req.body, { new: true }).
    then(data => {
      res.status(200).json({ status: true, message: "Testimonial updated", data })

    }).catch(error => {
      res.status(400).json({ status: false, message: error })

    })
}

//upload
exports.upload = (req, res) => {
  console.log(req.file)
  testimonials.findByIdAndUpdate(req.params.id, { $set: { image: req.file.path } }).
    then(data => {
      res.status(200).json({ status: true, message: "image uploaded", data })

    }).catch(error => {
      res.status(200).json({ status: false, message: error })

    })
}