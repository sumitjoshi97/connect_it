import React, { Component } from 'react'
import PropTypes from './prop-types'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class Dashboard extends Component {
  componentDidMount() {
      this.props.onGetCurrentProfile()
  }

  render() {
    return <div>dashboard</div>
  }
}

Dashboard.propTypes = {
    onGetCurrentProfile: PropTypes.func.isRequired
}

const mpaStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    onGetCurrentProfile: () => dispatch(actions.getCurrentProfile())
})

export default connect(
  mpaStateToProps,
  mapDispatchToProps
)(Dashboard)
