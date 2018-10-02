import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import * as actions from '../../store/actions/index'

import Spinner from '../Common/Spinner/Spinner'

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
        profileItems = <h1>Profile</h1>
      } else {
        profileItems = <h4>No Profiles Found</h4>
      }
    }
    return
    ;<div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Developer Profile</h1>
            <p className="lead text-center">
              Browse and connect with developers
            </p>
            {profileItems}
          </div>
        </div>
      </div>
    </div>
  }
}

Profiles.propTypes = {}

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
