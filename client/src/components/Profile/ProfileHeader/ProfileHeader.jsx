import React, { Fragment } from 'react'
import isEmpty from '../../../utils/isEmpty'

const ProfileHeader = ({ profile }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body back-purple text-white mb-3">
          <div className="row">
            <div className="col-2 col-md-2 m-auto">
              <img
                className="rounded-circle"
                src={profile.user.avatar}
                alt={profile.user.name}
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{profile.user.name}</h1>
            <p className="lead text-center">
              {profile.status}{' '}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <p>{profile.location}</p>

            <p>
              {isEmpty(profile.website) ? null : (
                <a
                  className="text-white p-2"
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-globe fa-2x" />
                </a>
              )}

              {/* check if social array is defined */}
              {profile.social && (
                <Fragment>
                  {!isEmpty(profile.social.twitter) && (
                    <a
                      className="text-white p-2"
                      href={profile.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter fa-2x" />
                    </a>
                  )}
                  {!isEmpty(profile.social.facebook) && (
                    <a
                      className="text-white p-2"
                      href={`https://${profile.social.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook fa-2x" />
                    </a>
                  )}
                  {!isEmpty(profile.social.linkedin) && (
                    <a
                      className="text-white p-2"
                      href={`https://${profile.social.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin fa-2x" />
                    </a>
                  )}
                  {!isEmpty(profile.social.youtube) && (
                    <a
                      className="text-white p-2"
                      href={`https://${profile.social.youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-youtube fa-2x" />
                    </a>
                  )}
                  {!isEmpty(profile.social.instagram) && (
                    <a
                      className="text-white p-2"
                      href={`https://${profile.social.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram fa-2x" />
                    </a>
                  )}
                </Fragment>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
