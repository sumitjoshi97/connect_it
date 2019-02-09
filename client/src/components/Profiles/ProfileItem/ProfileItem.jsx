import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import isEmpty from '../../../utils/isEmpty'

export class ProfileItem extends Component {
  render() {
    const { profile } = this.props
    return (
      <div className="card card-body bg-light m-5">
        <div className="row">
          <div className="col-2">
            <img
              src={profile.user.avatar}
              alt="user avatar"
              className="rounded-circle"
            />
          </div>
          <div className="col-lg-4 col-md-4 col-4">
            <h3>{profile.user.name}</h3>
            <p>{profile.status}</p>
            <p>
              {isEmpty(profile.company) ? null : (
                <Fragment>
                  <i className="fas fa-map-marker font-purple" />{' '}
                  <span>{profile.company}</span>
                </Fragment>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <Fragment>
                  <i className="fas fa-briefcase font-purple" />{' '}
                  <span>{profile.location}</span>
                </Fragment>
              )}
            </p>
            <Link
              to={`/profile/${profile.handle}`}
              className="btn btn-hero btn-shadow"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem
