import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Input from '../../Common/Input/Input'
import TextArea from '../../Common/Input/TextArea'

import * as actions from "../../../store/actions/index";

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

    
    render() {
    return <div />
  }
}

export default AddExperience
