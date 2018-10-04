import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextArea from '../../Common/Input/TextArea'
import * as actions from '../../../store/actions/index'

export class CommentForm extends Component {
  static propTypes = {
    onAddComment: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
  }

  state = {
    text: '',
    errors: {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.props) {
      return { errors: nextProps.errors }
    } else return null
  }

  onChange = e => {
    this.setState({
      text: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const { user, postId } = this.props

    // create new post from state
    const newComment = {
      text: this.state.text,
      user: user.id,
      avatar: user.avatar
    }

    // add new post
    this.props.onAddCommment(postId, newComment)
    // reset text state
    this.setState({ text: '' })
  }

  render() {
    const { errors } = this.state
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Write a comment...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextArea
                  name="text"
                  placeholder="Reply to post..."
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" value="Post" className="btn btn-dark">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors.errors
})

const mapDispatchToProps = dispatch => ({
  onAddComment: post => dispatch(actions.addComment(post))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm)
