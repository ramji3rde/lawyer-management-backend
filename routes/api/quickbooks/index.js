const router = require('express').Router()
const controller = require('./quickbooks.controller')


router.post("/invoice/create", controller.createInovice);
router.post("/customer/create", controller.createCustomer);

module.exports = router