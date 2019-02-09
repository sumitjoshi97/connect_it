import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

// import redux actions
import * as actions from '../../store/actions/index'

// import files
import Spinner from '../Common/Spinner/Spinner'
import ProfileItem from './ProfileItem/ProfileItem'

export class Profiles extends Component {
  componentDidMount() {
    this.props.onGetProfiles()
  }
  render() {
    const { profiles, loading } = this.props
    let profileItems

    if (profiles === null || loading) {
      profileItems = <Spinner />
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ))
      } else {
        profileItems = <h4>No Profiles Found</h4>
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center font-purple">
                Developer's Profile
              </h1>
              <p className="lead text-center font-purple">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Profiles.propTypes = {
  profiles: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  onGetProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profiles: state.profile.profiles,
  loading: state.profile.loading
})

const mapDispatchToProps = dispatch => ({
  onGetProfiles: () => dispatch(actions.getProfiles())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profiles)
