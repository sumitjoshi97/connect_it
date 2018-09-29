const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// import Post model schema
const Post = require('../../models/Post')

//import Profile model schema
const Profile = require('../../models/Profile')

// import post validations
const validatePostInput = require('../../validation/post')

// @route     GET api/posts/test
// @desc      Tests posts route
// @access    PUBLIC
router.get('/test', (req, res) => {
  res.send('posts')
})

// @route     GET api/posts
// @desc      get posts
// @access    PUBLIC
router.get('/', (req, res) => {
  // find posts and reverse the posts by date > descending order
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noPostsFound: 'no posts found' }))
})

// @route     GET api/posts/:post_id
// @desc      get post by id
// @access    PUBLIC
router.get('/:post_id', (req, res) => {
  // find post by id
  Post.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ noPostFound: 'no post found' }))
})

// @route     POST api/posts
// @desc      create a post
// @access    PRIVATE
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // destructure error and isValid from validation
    const { errors, isValid } = validatePostInput(req.body)

    // check validation
    if (!isValid) {
      res.status(400).json(errors)
    }

    // create new post from req.body
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    })

    // save new post and display
    newPost.save().then(post => res.json(post))
  }
)

// @route     POST api/posts/like/:post_id
// @desc      like post
// @access    PRIVATE
router.post(
  '/like/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyLiked: 'User already liked this post' })
          }

          // add user id to likes array
          post.likes.unshift({ user: req.user.id })

          // save like to post
          post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ postNotFound: 'No post found' }))
    })
  }
)

// @route     POST api/posts/unlike/:post_id
// @desc      unlike post
// @access    PRIVATE
router.post(
  '/unlike/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notLiked: 'you have not liked this post' })
          }

          // get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id)

          // splice Array
          post.likes.splice(removeIndex, 1)

          // save array with removed like
          post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ postNotFound: 'No post found' }))
    })
  }
)

// @route     POST api/posts/comment/:post_id
// @desc      add comment to post
// @access    PRIVATE
router.post(
  '/comment/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    // check validation
    if (!isValid) {
      req.status(400).json(errors)
    }

    Post.findById(req.params.post_id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        }

        // Add new comment to comment array
        post.comments.unshift(newComment)

        // save comment
        post.save().then(post => res.json(post))
      })
      .catch(err => res.status(404).json({ postNotFound: 'No post found' }))
  }
)

// @route     DELETE api/posts/comment/:post_id/:comment_id
// @desc      remove comment from post
// @access    PRIVATE
router.delete(
  '/comment/:post_id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        //check if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentNotExists: 'Comment does not exist' })
        }

        // get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id)
        console.log(removeIndex)
        // splice comment out of array
        post.comments.splice(removeIndex, 1)
        console.log(post)
        // save post
        post.save().then(post => res.json(post))
      })
      .catch(err => res.status(404).json({ postNotFound: 'No post found' }))
  }
)

// @route     DELETE api/posts/:post_id
// @desc      delete a post
// @access    PRIVATE
router.delete(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          // check fo post user
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notAuthorirized: 'User not authorized' })
          }

          // delete post
          post.remove().then(() => res.json({ success: true }))
        })
        .catch(err => res.status(404).json({ postNotFound: 'post not found' }))
    })
  }
)

module.exports = router
