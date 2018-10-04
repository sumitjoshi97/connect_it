import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spinner from '../Common/Spinner/Spinner'
import PostItem from '../Posts/PostFeed/PostItem/PostItem'

import * as actions from '../../store/actions/index'
import CommentForm from './CommentForm/CommentForm'

export class Post extends Component {
  static propTypes = {
    post: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    onGetPost: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.onGetPost(this.props.match.params.id)
  }

  render() {
    const { post, loading } = this.props

    let postContent = (
      <div>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
      </div>
    )

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/posts" className="btn btn-light">
                Back
              </Link>
              <div>{postContent}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post.post,
  loading: state.post.loading
})

const mapDispatchToProps = dispatch => ({
  onGetPost: id => dispatch(actions.getPost(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
