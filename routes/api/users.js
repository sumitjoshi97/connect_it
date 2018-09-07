const express = require('express')
const router = express.Router()

const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

// load user schema
const User = require('../../models/User')

// @route     GET api/users/test
// @desc      Tests users route
// @access    PUBLIC

router.get('/', (req, res) => {
    res.send('users')
})

// @route     POST api/users/register
// @desc      register users
// @access    PUBLIC
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email already exits' })
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg',  //Rating
                    d: 'nm'   //default
                })

                // create new user
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                })

                // hash the password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        // save user in database
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

// @route     POST api/users/login
// @desc      login user
// @access    PUBLIC
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    //find user by email
    User.findOne({ email })
        .then(user => {
            // check user is found
            if (!user) {
                return res.status(404).json({ email: 'User not found' })
            }

            // check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        res.json({msg: 'success'})
                    } else {
                        return res.status(400).json({password: 'Email/Password doesn\'t match'})
                    }
                })
        })
        .catch()
})
module.exports = router