const Members = require('../../../models/members')
const user = require('../../../models/user')
const config = require('../../../config');
const crypto = require('crypto')

// Create New List

const AddMember = (req, res) => {
  const { email, password, userId } = req.body
  user.findOne({ emailAddress: email }).then(async (result) => {
    console.log(result)
    if (!result) {
      if (password) {
        req.body.password = await crypto.createHmac('sha1', config.secret)
          .update(password)
          .digest('base64')
      }
      let member = new Members(req.body)
      member.save().then(data => {
        res.status(200).json({ status: true, message: "member Saved", data })

      }).catch(error => {
        res.status(400).json({ status: false, message: error })

      })
    } else {
      res.status(400).json({ status: false, message: "Email already registered" })
    }
  })

}
exports.addMember = (req, res) => {
  const { userId } = req.body
  Members.find({ userId }).then((members) => {
    user.findOne({ _id: userId })
      .then((_user) => {
        console.log({ members: members.length, user: _user.registeredOn })
        if (_user.registeredOn && _user.registeredOn.requestGranted === "Yes") {
          // if (_user.registeredOn.subscriptionRequested === 'yearly' && members.length > _user.registeredOn.firmMembers) {
          //   console.log("here____________")
          //   throw new Error("Maximum limit reached")
          // }
          // else if (_user.registeredOn.subscriptionRequested === 'monthly' && members.length > _user.registeredOn.firmMembers) {
          //   console.log("here mmmmm____________")
          //   throw new Error("Maximum limit reached")
          // }
          if (members.length >= _user.registeredOn.firmMembers) {
            console.log("here____________")
            throw new Error("Maximum limit reached")
          }
          else {
            console.log("re____________")
            AddMember(req, res)
          }
        } else {
          AddMember(req, res)
        }
      })
      .catch((err) =>
        res.status(400).json({ status: false, message: err.message })
      )
  })


}

//Delete a list
exports.removeMember = (req, res) => {
  // console.log(req.params.id)
  console.log(req.params.id, 'Id')
  Members.findByIdAndRemove(req.params.id).
    then(data => {
      res.status(200).json({ status: true, message: "Note Removed", data })

    }).catch(error => {
      res.status(200).json({ status: false, message: error })

    })
}

//Show all 
exports.showAll = (req, res) => {

  Members.find({}).
    then(data => {
      res.status(200).json({ status: true, message: "member fetched", data })

    }).catch(error => {
      res.status(200).json({ status: false, message: error })

    })
}

//fetch for one user
exports.viewSpecific = (req, res) => {

  Members.find({ userId: req.params.id }).
    then(data => {
      res.status(200).json({ status: true, message: "member fetched", data })

    }).catch(error => {
      res.status(200).json({ status: false, message: error })

    })
}

exports.updateMember = (req, res) => {

  Members.findByIdAndUpdate(req.params.id, req.body, { new: true }).
    then(data => {
      res.status(200).json({ status: true, message: "Members updated", data })

    }).catch(error => {
      res.status(400).json({ status: false, message: error })

    })
}