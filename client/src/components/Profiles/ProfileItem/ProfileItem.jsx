import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import isEmpty from '../../../store/utils/isEmpty'

export class ProfileItem extends Component {
  render() {
    const { profile } = this.props
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              src={profile.user.avatar}
              alt="user avatar"
              className="rounded-circle"
            />
          </div>
          <div className="col-g-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>{profile.status}</p>
            <p>
              {isEmpty(profile.company) ? null : (
                <Fragment>
                  <i className="fas fa-map-marker" />
                  <span>{profile.company}</span>
                </Fragment>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <Fragment>
                  <i className="fas fa-briefcase" />
                  <span>{profile.location}</span>
                </Fragment>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

ProfileItem = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem
