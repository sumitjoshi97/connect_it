import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const SelectList = ({
  name,
  placeholder,
  value,
  error,
  options,
  info,
  onChange
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ))
  return (
    <div className="form-group">
      <select
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  )
}

SelectList.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}

export default SelectList
