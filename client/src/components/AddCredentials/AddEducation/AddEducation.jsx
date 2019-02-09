import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import components
import Input from '../../Common/Input/Input'
import TextArea from '../../Common/Input/TextArea'

// import actions
import * as actions from '../../../store/actions/index'

class AddEducation extends Component {
  state = {
    school: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {},
    disabled: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // checks for errors if errors are updated then returns error state with new values
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
  onSubmit = e => {
    e.preventDefault()
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    }
    console.log(eduData)
    // sends eduData and router history to addEducation redux action
    this.props.onAddEducation(eduData, this.props.history)
  }

  render() {
    const { errors } = this.state

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-white btn-shadow">
                Go back
              </Link>
              <h1 className="display-4 text-center font-purple">
                Add Education
              </h1>
              <small className="d-block pb-3">* required fields</small>
              <form onSubmit={this.onSubmit}>
                <Input
                  name="school"
                  placeholder="School *"
                  value={this.state.school}
                  onChange={this.onInputChange}
                  error={errors.school}
                />

                <Input
                  name="degree"
                  placeholder="Degree or Certifiation *"
                  value={this.state.degree}
                  onChange={this.onInputChange}
                  error={errors.degree}
                />
                <Input
                  name="fieldOfStudy"
                  placeholder="Field of study *"
                  value={this.state.fieldOfStudy}
                  onChange={this.onInputChange}
                  error={errors.fieldOfStudy}
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
                    Current School
                  </label>
                </div>
                <TextArea
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onInputChange}
                  error={errors.description}
                  info="Tell us more about your school"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-hero btn-shadow btn-block btn-lg mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddEducation.propTypes = {
  errors: PropTypes.object.isRequired,
  onAddEducation: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors.errors
})

const mapDispatchToProps = dispatch => ({
  onAddEducation: (eduData, history) =>
    dispatch(actions.addEducation(eduData, history))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddEducation))
