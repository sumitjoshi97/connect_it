import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../../../store/actions/index'

class Header extends Component {
  onLogoutClick = e => {
    e.preventDefault()
    this.props.onClearCurrentProfile()
    this.props.onLogoutUser()
    this.props.history.push('/login')
  }

  render() {
    const { user, isAuth } = this.props

    //links for guest accounts - not looged in users
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    )

    //navbar links for logged in users
    const authLinks = (
      <Fragment>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/profiles">
              {' '}
              Developers
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/posts">
              Posts
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={this.onLogoutClick}>
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: '25px', height: '25px', marginRight: '5px' }}
                title="you must have a gravatar connected to your email to display an image"
              />
              Logout
            </a>
          </li>
        </ul>
      </Fragment>
    )

    // return header component to render
    return (
      <nav className="navbar navbar-expand-sm navbar-dark mb-4 back-purple header">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnect
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuth ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    )
  }
}

Header.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  user: PropTypes.object,
  onLogoutUser: PropTypes.func.isRequired,
  onClearCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
  onLogoutUser: () => dispatch(actions.logoutUser()),
  onClearCurrentProfile: () => dispatch(actions.clearCurrentProfile())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header))
