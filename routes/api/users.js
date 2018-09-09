const express = require('express')
const router = express.Router()

const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const keys = require('../../config/keys')

// load input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

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
    const {errors, isValid} = validateRegisterInput(req.body)

    // check validation of input
    if (!isValid) {
        return res.status(400).json(errors)
    }   
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
    const {errors, isValid} = validateLoginInput(req.body)

    if(!isValid) {
        return res.status(400).json(errors)
    }
    const email = req.body.email
    const password = req.body.password

    //find user by email
    User.findOne({ email })
        .then(user => {
            // check user is found
            if (!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors)
            }

            // check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //user matched
                        const payload = { id: user.id, name: user.name, avatar: user.avatar }  //create jet token payload
                        
                        //sign token
                        jwt.sign(payload, keys.secretKey, {expiresIn: 3600}, (err, token) => {
                            res.json({
                                success: true,
                                token: `Bearer ${token}`
                            })
                        })
                    } else {
                        errors.password = 'Email/Password doesn\'t match'
                        return res.status(400).json(errors)
                    }
                })
        })
        .catch(err => console.log(err))
})

// @route     GET api/users/current
// @desc      return current user
// @access    PRIVATE
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})
module.exports = router