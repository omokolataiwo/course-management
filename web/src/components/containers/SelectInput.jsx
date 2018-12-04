import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({
  label, value, options, onChange, name, size
}) => (
  <div className={`col-md-${size} form-group`}>
    <label htmlFor={name}>{label}</label>
    <select
      className="form-control"
      value={value}
      onChange={onChange}
      name={name}
      id={name}
    >
      {options
        && options.map(option => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
    </select>
  </div>
);

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string.isRequired, value: PropTypes.string.isRequired })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.string
};

SelectInput.defaultProps = {
  size: '12'
};

export default SelectInput;
