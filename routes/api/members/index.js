const router = require('express').Router()
const controller = require('./members.controller')

router.post("/create", controller.addMember)
router.get("/delete/:id", controller.removeMember)
router.get("/showall", controller.showAll)
router.get("/viewforuser/:id", controller.viewSpecific)
router.post("/edit/:id", controller.updateMember)

module.exports = router