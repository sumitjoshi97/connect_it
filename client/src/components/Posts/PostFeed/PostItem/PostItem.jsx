import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// import redux actions
import * as actions from '../../../../store/actions/index'

export class PostItem extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isAuth: PropTypes.bool.isRequired
  }

  render() {
    const { post, user, isAuth, onAddLike, onRemoveLike } = this.props
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to={`/profile/${post.user}`}>
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                
              />
            </Link>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>

            {/* buttons shows when auth is true */}
            {isAuth && (
              <div>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => onAddLike(post._id)}>
                  <i className="text-info fas fa-thumbs-up" />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => onRemoveLike(post._id)}>
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
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuth: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
  onDeletePost: id => dispatch(actions.deletePost(id)),
  onAddLike: id => dispatch(actions.addLike(id)),
  onRemoveLike: id => dispatch(actions.removeLike(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem)