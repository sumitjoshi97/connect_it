import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spinner from '../Common/Spinner/Spinner'
import ProfileHeader from './ProfileHeader/ProfileHeader'
import ProfileAbout from './ProfileAbout/ProfileAbout'
import ProfileCreds from './ProfileCreds/ProfileCreds'
import ProfileGithub from './ProfileGithub/ProfileGithub'

import * as actions from '../../store/actions/index'

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.onGetProfileByHandle(this.props.match.params.handle)
    }
  }

  render() {
    let userProfile

    userProfile = <Spinner />

    if (!this.props.loading) {
      const { profile } = this.props

      userProfile = (
        <div>
          <div className="row">
            <div className="col-6">
              <Link
                to="/dashboard"
                className="btn btn-secondary mb-3 float-left">
                Go Back
              </Link>
            </div>
          </div>

          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds profile={profile} />
          {profile.githubUsername && (
            <ProfileGithub username={profile.githubUsername} />
          )}
        </div>
      )
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{userProfile}</div>
          </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onGetProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  loading: state.profile.loading
})

const mapDispatchToProps = dispatch => ({
  onGetProfileByHandle: handle => dispatch(actions.getProfileByHandle(handle))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
