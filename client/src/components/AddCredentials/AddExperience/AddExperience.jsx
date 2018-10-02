import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Input from '../../Common/Input/Input'
import TextArea from '../../Common/Input/TextArea'

import * as actions from '../../../store/actions/index'

class AddExperience extends Component {
  state = {
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {},
    disabled: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors }
    } else return null
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // disables to-date input and set experience to currently work
  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    })
  }

  // adds the experience to db
  onSubmit = () => {
    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.to,
      description: this.state.description
    }

    // sends expData and router history to add experience redux action
    this.props.onAddExperience(expData, this.props.history)
  }

  render() {
    const { errors } = this.state

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <small className="d-block pb-3">* required fields</small>
              <form onSubmit={this.onSubmit}>
                <Input
                  name="company"
                  placeholder="Company *"
                  value={this.state.company}
                  onChange={this.onInputChange}
                  error={errors.company}
                />

                <Input
                  name="title"
                  placeholder="Job title *"
                  value={this.state.title}
                  onChange={this.onInputChange}
                  error={errors.title}
                />
                <h6>From date *</h6>
                <Input
                  name="from"
                  type="date"
                  placeholder="from (date) *"
                  value={this.state.from}
                  onChange={this.onInputChange}
                  error={errors.from}
                />
                <h6>To date</h6>
                <Input
                  name="to"
                  type="date"
                  placeholder="To (date) *"
                  value={this.state.to}
                  onChange={this.onInputChange}
                  error={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />

                <div className="for-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextArea
                  placeholder="Job description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onInputChange}
                  error={errors.description}
                  info="Tell us about your position"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  errors: state.errors.errors
})

const mapDispatchToProps = dispatch => ({
  onAddExperience: experienceData => dispatch(actions.addExperience(experienceData))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddExperience))
