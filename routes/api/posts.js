const express = require('express')
const router = express.Router()

// @route     GET api/posts/test
// @desc      Tests posts route
// @access    PUBLIC

router.get('/', (req, res) => {
    res.send('posts')
})

module.exports = router