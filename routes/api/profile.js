const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// load profile model
const Profile = require('../../models/Profile')

// load user model schema
const User = require('../../models/User')

// @route     GET api/profile/test
// @desc      Tests profile route
// @access    PUBLIC
router.get('/test', (req, res) => {
    res.send('profile test')
})

// @route     GET api/profile
// @desc      Get current user profile
// @access    PRIVATE
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {}

    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            // checks if profile is present
            if (!profile) {
                errors.noProfile = 'There is no profile for user'
                return res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

// @route     POST api/profile
// @desc      create or edit user profile
// @access    PRIVATE
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {}

    //get fields
    const profileFields = {}
    profileFields.user = req.user.id
    if (req.body.handle) profileFields.handle = req.body.handle
    if (req.body.company) profileFields.company = req.body.company
    if (req.body.website) profileFields.website = req.body.website
    if (req.body.location) profileFields.location = req.body.location
    if (req.body.bio) profileFields.bio = req.body.bio
    if (req.body.status) profileFields.status = req.body.status
    if (req.body.githubUsername) profileFields.githubUsername = req.body.githubUsername

    // splits skills string to array
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',')
    }

    // social
    profileFields.social = {}
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(profile) {
                //update the existed profile 
                Profile.findOneAndUpdate(
                    { user: req.user.id}, 
                    {$set: profileFields}, 
                    {new: true}
                    )
                    .then(profile => res.json(profile))
            } else {
                //create the profile

                //check if handles exist
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'the handle already exists'
                        res.status(400).json(errors)
                        }

                        // save profile if not exists
                        new Profile(profileFields).save().then(profile => res.json(profile))
                    })
            }
        })

})

module.exports = router