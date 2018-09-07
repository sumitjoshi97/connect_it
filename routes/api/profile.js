const express = require('express')
const router = express.Router()

// @route     GET api/profile/test
// @desc      Tests profile route
// @access    PUBLIC

router.get('/', (req, res) => {
    res.send('profile')
})

module.exports = router