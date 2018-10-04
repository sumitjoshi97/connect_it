import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommentItem from './CommentItem/Commentitem'

export class CommentFeed extends Component {
  static propTypes = {
    comments: PropTypes.arrray,
    postId: PropTypes.string
  }

  render() {
    const { comments, postId } = this.props
    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} postId={postId} />
    ))
  }
}

export default CommentFeed