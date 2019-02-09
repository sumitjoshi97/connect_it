import React from 'react'
import { Link } from 'react-router-dom'

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-white btn-shadow mr-4">
        <i className="fas fa-user-circle font-purple mr-1" /> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-white btn-shadow mr-4">
        <i className="fab fa-black-tie font-purple mr-1" />
        Add Experience
      </Link>
      <Link to="add-education" className="btn btn-white btn-shadow mr-4">
        <i className="fas fa-graduation-cap font-purple mr-1" />
        Add Education
      </Link>
    </div>
  )
}

export default ProfileActions
