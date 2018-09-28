const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// load profile model
const Profile = require('../../models/Profile')

// load user model schema
const User = require('../../models/User')

// import profile validate
const validateProfileInput = require('../../validation/profile')

// import experience validate
const validateExperienceInput = require('../../validation/experience')

// import education validate
const validateEducationInput = require('../../validation/education')

// @route     GET api/profile/test
// @desc      Tests profile route
// @access    PUBLIC
router.get('/test', (req, res) => {
  res.send('profile test')
})

// @route     GET api/profile
// @desc      Get current user profile
// @access    PRIVATE
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {}

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        // checks if profile is present
        if (!profile) {
          errors.noProfile = 'There is no profile for user'
          return res.status(404).json(errors)
        }
        res.json(profile)
      })
      .catch(err => res.status(404).json(err))
  }
)

// @route     GET api/profile/all
// @desc      Get all profiles
// @access    PUBLIC
router.get('/all', (req, res) => {
  const errors = {}

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noProfile = 'There are no profiles'
        res.status(404).json(errors)
      }

      res.json(profiles)
    })
    .catch(err => res.status(404).json({ profile: 'There are no profile' }))
})

// @route     GET api/profile/handle/:handle
// @desc      Get profile by handle
// @access    PUBLIC
router.get('/handle/:handle', (req, res) => {
  const errors = {}

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for user'
        res.status(404).json(errors)
      }

      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// @route     GET api/profile/user/:user_id
// @desc      Get profile by user_id
// @access    PUBLIC
router.get('/user/:user_id', (req, res) => {
  const errors = {}

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for user'
        res.status(404).json(errors)
      }

      res.json(profile)
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user ' })
    )
})

// @route     POST api/profile
// @desc      create or edit user profile
// @access    PRIVATE
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body)

    //check validation
    if (!isValid) {
      // return any errors with 400 status
      return res.status(400).send(errors)
    }

    //get fields
    const profileFields = {}
    profileFields.user = req.user.id
    if (req.body.handle) profileFields.handle = req.body.handle
    if (req.body.company) profileFields.company = req.body.company
    if (req.body.website) profileFields.website = req.body.website
    if (req.body.location) profileFields.location = req.body.location
    if (req.body.bio) profileFields.bio = req.body.bio
    if (req.body.status) profileFields.status = req.body.status
    if (req.body.githubUsername)
      profileFields.githubUsername = req.body.githubUsername

    // splits skills string to array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',')
    }

    // social
    profileFields.social = {}
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update the existed profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile))
      } else {
        //create the profile

        //check if handles exist
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'the handle already exists'
            res.status(400).json(errors)
          }

          // save profile if not exists
          new Profile(profileFields).save().then(profile => res.json(profile))
        })
      }
    })
  }
)

// @route     POST api/profile/experience
// @desc      add experiece to profile
// @access    PRIVATE
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body)

    if (!isValid) {
      res.status(400).send(errors)
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      // add to experience array
      profile.experience.unshift(newExp)

      profile.save().then(profile => res.json(profile))
    })
  }
)

// @route     POST api/profile/education
// @desc      add education to profile
// @access    PRIVATE
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body)

    if (!isValid) {
      res.status(400).send(errors)
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      // add to education array
      profile.education.unshift(newEdu)

      profile.save().then(profile => res.json(profile))
    })
  }
)

// @route     DELETE api/profile/experience/:exp_id
// @desc      delete experience from experience route
// @access    PRIVATE
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id)

        //splice out array
        profile.experience.splice(removeIndex, 1)

        // save updated profile
        profile.save().then(profile => res.json(profile))
      })
      .catch(err => res.status(404).json(err))
  }
)

// @route     DELETE api/profile/education/:edu_id
// @desc      delete education from education route
// @access    PRIVATE
router.delete(
  '/education/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.exp_id)

        //splice out array
        profile.education.splice(removeIndex, 1)

        // save updated profile
        profile.save().then(profile => res.json(profile))
      })
      .catch(err => res.status(404).json(err))
  }
)

// @route     DELETE api/profile/:user_id
// @desc      delete user with profile
// @access    PRIVATE
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      )
    })
  }
)

module.exports = router
