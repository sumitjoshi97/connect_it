import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const Input = ({ 
  name, 
  placeholder, 
  value,
  error, 
  type, 
  icon, 
  onChange,
  info 
}) => (
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text">
        <i className={icon} />
      </span>
    </div>
    <input
      type={type}
      className={classnames('form-control form-control-lg', {
        'is-invalid': error
      })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    {error && <div className="invalid-feedback">{error}</div>}
    {info && <small className="form-text text-muted">{info}</small>}
  </div>
)

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

Input.defaultProps = {
  type: 'text'
}

export default Input
