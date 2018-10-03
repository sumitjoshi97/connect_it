import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'

import * as actions from '../../../../store/actions/index'

export class PostItem extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  render() {
    const { post, user } = this.props
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <button type="button" className="btn btn-light mr-1">
              <i className="text-info fas fa-thumbs-up" />
              {/* <span className="badge badge-light">{post.like.length}</span> */}
            </button>
            <button type="button" className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <Link to={`post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {post.user === user.id && (
              <button
                type="button"
                onClick={() => this.props.onDeletePost(post._id)}
                className="btn btn-danger mr-1">
                <i className="fas fa-times" />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
  onDeletePost: id => dispatch(actions.deletePost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)
