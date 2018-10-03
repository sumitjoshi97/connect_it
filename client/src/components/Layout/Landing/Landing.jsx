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
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Connector</h1>
                <p className="lead">
                  {' '}
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
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
