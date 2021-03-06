import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Moment from 'react-moment'
import * as actions from '../../store/actions/index'

export class Education extends Component {
  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{' '}
          {edu.current ? (
            'current'
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => this.props.onDeleteEducation(edu._id)}
            className="btn btn-danger btn-shadow"
          >
            Delete
          </button>
        </td>
      </tr>
    ))

    return (
      <div>
        <h4 className="mb-4">Education</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    )
  }
}

Education.propTypes = {
  education: PropTypes.array.isRequired
}

const mapDispatchToProps = dispatch => ({
  onDeleteEducation: exp_id => dispatch(actions.deleteEducation(exp_id))
})

export default connect(
  null,
  mapDispatchToProps
)(Education)
