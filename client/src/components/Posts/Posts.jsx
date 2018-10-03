import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PostForm from './PostForm/PostForm'

export class Posts extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div className='feed'>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <PostForm />
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Posts
