import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PostItem from './PostItem/PostItem'

export class PostFeed extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  render() {
    return this.props.posts.map(post => <PostItem showActions={true} post={post} />)
  }
}

export default PostFeed
