const express = require('express')

const bench = require('../controller/benchController')

const router = express.Router();

router.get('/empWorkingList', bench.empWorkingList)
router.get('/serchEmployee/:letter', bench.searchEmployee)
router.patch('/empUpdateStatus', bench.updateStatus)

module.exports = router
