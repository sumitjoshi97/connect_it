import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextArea from '../../Common/Input/TextArea'
import * as actions from '../../../store/actions/index'

export class PostForm extends Component {
  static propTypes = {
    onAddPost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
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

    const { user } = this.props

    // create new post from state
    const newPost = {
      text: this.state.text,
      user: user.id,
      avatar: user.avatar
    }

    // add new post
    this.props.onAddPost(newPost)
    // reset text state
    this.setState({ text: '' })
  }

  render() {
    const { errors } = this.state
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextArea
                  name="text"
                  placeholder="Create a post"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" value="Post" className="btn btn-dark">
                Submit
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
  onAddPost: post => dispatch(actions.addPost(post))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm)
