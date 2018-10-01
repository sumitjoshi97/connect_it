import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../Common/Spinner/Spinner'
class Dashboard extends Component {
  componentDidMount() {
    this.props.onGetCurrentProfile()
  }

  render() {
    const { profile, loading, user } = this.props

    let dashboardContent

    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      //check if logged in user has profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h2>Profile</h2>
      } else {
        //User is ogged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not setup a profile yet, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary">
              Create Profile
            </Link>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  onGetCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

const mpaStateToProps = state => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
  user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
  onGetCurrentProfile: () => dispatch(actions.getCurrentProfile())
})

export default connect(
  mpaStateToProps,
  mapDispatchToProps
)(Dashboard)
