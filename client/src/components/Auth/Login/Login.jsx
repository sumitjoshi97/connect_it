import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import PropTypes from 'prop-types'

export class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.onLogin(user)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // push route --/dashboard-- if user is authenticated
    if (nextProps.isAuth) {
      nextProps.history.push('/dashboard')
    }

    // update errors store if errors props from redux store are different
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors }
    } else return null
  }

  // render login Component
  render() {
    const { errors } = this.state

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    onChange={this.onInputChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    onChange={this.onInputChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  errors: state.errors.errors
})

const mapDispatchToProps = dispatch => ({
  onLogin: user => dispatch(actions.loginUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
