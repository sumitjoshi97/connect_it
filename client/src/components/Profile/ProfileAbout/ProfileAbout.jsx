import React from 'react'
import isEmpty from '../../../utils/isEmpty'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile }) => {
  const firstName = profile.user.name.trim().split(' ')[0]
  const skills = profile.skills.map((skill, i) => (
    <div key={i} className="p-3">
      <i className="fa fa-check" />{' '}{skill}
    </div>
  ))
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{`${firstName} Bio`}</h3>
          <p className="lead">
            {isEmpty(profile.bio) ? (
              <span>{`${firstName} does not have a bio`}</span>
            ) : (
              <span>{profile.bio}</span>
            )}
          </p>
          <hr />
          <h3 className="text-center text-info">skills</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {skills}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout
