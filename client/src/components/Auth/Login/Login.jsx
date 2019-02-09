import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import PropTypes from 'prop-types'
import Input from '../../Common/Input/Input'

export class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  componentDidMount() {
    if (this.props.isAuth) {
      this.props.history.push('/dashboard')
    }
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
            <div className="col-md-6 m-auto">
              <h1 className="display-4 text-center font-purple">Log In</h1>
              <p className="text-center mb-4 font-purple">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={this.state.email}
                  onChange={this.onInputChange}
                  error={errors.email}
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                  error={errors.password}
                />

                <input
                  type="submit"
                  className="btn btn-lg btn-block mt-4 btn-hero btn-shadow"
                />
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
