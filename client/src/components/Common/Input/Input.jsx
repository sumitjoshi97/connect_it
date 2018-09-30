import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const Input = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => (
  <div className="form-group">
    <input
      type={type}
      className={classnames('form-control form-control-lg', {
        'is-invalid': error
      })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    {error && <div className="invalid-feedback">{error}</div>}
    {info && <small className="form-text text-muted">{info}</small>}
  </div>
)

Input.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
}

Input.defaultProps = {
    type: 'text'
}

export default Input
