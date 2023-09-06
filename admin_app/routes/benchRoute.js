const express = require('express')

const bench = require('../controller/benchController')
const { authentication } = require('../../middleware/authToken')

const router = express.Router();

router.get('/empWorkingList', authentication, bench.empWorkingList)
router.get('/searchEmployee/:letter', authentication, bench.searchEmployee)
router.patch('/empUpdateStatus', authentication, bench.updateStatus)

module.exports = router
