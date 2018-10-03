import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

const ProfileCreds = ({ profile }) => {
  const { experience, education } = profile
  const expItems = experience.map(exp => (
    <li key={exp._id} className="list-group-item">
      <h4>{exp.company}</h4>
      <p>
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{' '}
        {exp.current ? (
          'Current'
        ) : (
          <Moment format="DD/MM/YYYY">{exp.to}</Moment>
        )}
      </p>
      <p>
        <strong>Position: </strong> {exp.title}
      </p>
      <p>
        {exp.location === '' ? null : (
          <span>
            <strong>Location: </strong> {exp.location}
          </span>
        )}
      </p>
      <p>
        {exp.description === '' ? null : (
          <span>
            <strong>Description: </strong> {exp.description}
          </span>
        )}
      </p>
    </li>
  ))

  const eduItems = education.map(edu => (
    <li key={edu._id} className="list-group-item">
      <h4>{edu.school}</h4>
      <p>
        <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{' '}
        {edu.current ? (
          'Current'
        ) : (
          <Moment format="DD/MM/YYYY">{edu.to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree: </strong> {edu.degree}
      </p>
      <p>
        {edu.location === '' ? null : (
          <span>
            <strong>Field of study: </strong> {edu.fieldOfStudy}
          </span>
        )}
      </p>
      <p>
        {edu.description === '' ? null : (
          <span>
            <strong>Description: </strong> {edu.description}
          </span>
        )}
      </p>
    </li>
  ))
  return (
    <div className="row">
      <div className="col-md-6">
        <h3 className="text-center text-info">Experience</h3>
        {expItems.length > 0 ? (
          <ul className="list-group">{expItems}</ul>
        ) : (
          <span>No experience yet</span>
        )}
      </div>
      <div className="col-md-6">
        <h3 className="text-center text-info">Education</h3>
        {eduItems.length > 0 ? (
          <ul className="list-group">{eduItems}</ul>
        ) : (
          <span>No education yet</span>
        )}
      </div>
    </div>
  )
}

ProfileCreds.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileCreds
