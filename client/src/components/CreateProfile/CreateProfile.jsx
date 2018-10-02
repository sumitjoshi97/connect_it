import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Input from '../Common/Input/Input'
import InputGroup from '../Common/Input/InputGroup'
import TextArea from '../Common/Input/TextArea'
import SelectList from '../Common/Input/SelectList'
import * as actions from '../../store/actions/index'

class CreateProfile extends Component {
  state = {
    displaySocialInput: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubUsername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {}
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubUsername: this.state.githubUsername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    }
    this.props.onCreateProfile(profileData, this.props.history)
  }

  componentDidMount() {
    this.props.onGetCurrentProfile()
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // update errors store if errors props from redux store are different
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors }
    } else return null
  }

  render() {
    const { displaySocialInput, errors } = this.state

    // options for status
    const options = [
      { label: 'Select Professional Status *', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'UI/UX Designer', value: 'UI/UX Designer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Other', value: 'Other' }
    ]

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create your Profile</h1>
              <p className="lead text-center">
                Add some info to make your profile stand out
              </p>
              <form onSubmit={this.onSubmit}>
                <Input
                  name="handle"
                  placeholder="Profile handle *"
                  value={this.state.handle}
                  onChange={this.onInputChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL"
                />
                <SelectList
                  name="status"
                  placeholder="Status"
                  value={this.state.status}
                  options={options}
                  onChange={this.onInputChange}
                  error={errors.status}
                  info="Give idea about your current designation"
                />
                <Input
                  name="company"
                  placeholder="Company"
                  value={this.state.company}
                  onChange={this.onInputChange}
                  error={errors.company}
                />
                <Input
                  name="website"
                  placeholder="Website"
                  value={this.state.website}
                  onChange={this.onInputChange}
                  error={errors.website}
                />
                <Input
                  name="location"
                  placeholder="Location"
                  value={this.state.location}
                  onChange={this.onInputChange}
                  error={errors.location}
                />
                <Input
                  name="skills"
                  placeholder="Skills"
                  value={this.state.skills}
                  onChange={this.onInputChange}
                  error={errors.skills}
                  info="use comma separated values - HTML,CSS,React"
                />
                <TextArea
                  name="bio"
                  placeholder="Bio"
                  value={this.state.bio}
                  onChange={this.onInputChange}
                  error={errors.bio}
                  info="litte about yourself"
                />

                <div className="mb-3">
                  <button
                    onClick={() =>
                      this.setState(prevState => ({
                        displaySocialInput: !prevState.displaySocialInput
                      }))
                    }
                    className="btn btn-secondary">
                    Add social links
                  </button>
                  <span className="text-muted"> Optional</span>
                </div>

                {/* conditional rendering of social handles */}
                {displaySocialInput && (
                  <Fragment>
                    <InputGroup
                      name="twitter"
                      icon="fab fa-twitter"
                      placeholder="Twitter Profile"
                      onChange={this.onInputChange}
                      value={this.state.twitter}
                      error={errors.twitter}
                    />
                    <InputGroup
                      name="facebook"
                      icon="fab fa-facebook"
                      placeholder="Facebook Profile"
                      onChange={this.onInputChange}
                      value={this.state.facebook}
                      error={errors.facebook}
                    />
                    <InputGroup
                      name="youtube"
                      icon="fab fa-youtube"
                      placeholder="Youtube Profile"
                      onChange={this.onInputChange}
                      value={this.state.youtube}
                      error={errors.youtube}
                    />
                    <InputGroup
                      name="instagram"
                      icon="fab fa-instagram"
                      placeholder="Instagram Profile"
                      onChange={this.onInputChange}
                      value={this.state.instagram}
                      error={errors.instagram}
                    />
                  </Fragment>
                )}

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  onCreateProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors.errors
})

const mapDispatchToProps = dispatch => ({
  onCreateProfile: (profile, history) => dispatch(actions.createProfile(profile, history)),
  onGetCurrentProfile: () => dispatch(actions.getCurrentProfile())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateProfile))
