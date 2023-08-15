const express = require('express')

const bench = require('../controller/benchController')

const router = express.Router();

router.get('/empWorkingList', bench.empWorkingList)
router.patch('/empUpdateStatus', bench.updateStatus)

module.exports = router
