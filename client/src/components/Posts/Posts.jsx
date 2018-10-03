import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PostForm from './PostForm/PostForm'
import PostFeed from './PostFeed/PostFeed'
import Spinner from '../Common/Spinner/Spinner'

import * as actions from '../../store/actions/index'

export class Posts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  }

  render() {
    const {posts, loading} = this.props

    let postContent = <Spinner/>

    if (!loading) {
      postContent = <PostFeed posts={posts} />
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.post.posts,
  loading: state.post.loading
})

const mapDispatchToProps = dispatch => ({
  onGetPosts: () => dispatch(actions.getPosts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
