import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions/index'

export class CommentItem extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    onDeleteComment: PropTypes.func.isRequired
  }

  render() {
    const { user, comment, postId, onDeleteComment } = this.props
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-1">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt={comment.name}
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>

            {/* show delete button if comment user is logged user */}
            {comment.user === user.id && (
              <button
                onClick={() => onDeleteComment(postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                {' '}
                <i className="fas fa-times" />{' '}
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
  onDeleteComment: (postId, commentId) =>
    dispatch(actions.deleteComment(postId, commentId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentItem)
