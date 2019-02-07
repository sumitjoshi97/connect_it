import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Landing extends Component {
  render() {
    let redirectRoute = null

    // checks if user is authenticated and sets redirected route to dashboard
    if (this.props.isAuth) {
      redirectRoute = <Redirect to="/dashboard" />
    }

    return (
      <div className="landing">
        {redirectRoute}
        <div className="dark-overlay landing-inner">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center font-purple">
                <h2 className="display-3 mb-4 text-uppercase font-weight-bold">
                  Dev Connect
                </h2>
                <p className="lead">
                  {' '}
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <hr />
                <Link
                  to="/register"
                  className="btn btn-lg mr-2 btn-hero btn-shadow"
                >
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-white btn-shadow">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  isAuth: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)
