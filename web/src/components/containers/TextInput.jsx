import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  size, onChange, placeholder, name, value, errors, label
}) => (
  <div className={`form-group col-md-${size}`}>
    <label htmlFor={name}>{label}</label>
    <input type="text" id={name} className="form-control" value={value} name={name} placeholder={placeholder} onChange={onChange} />
    <div className="error">
      {errors.map((error, index) => <span key={index}>{error}</span>)}
    </div>
  </div>
);

TextInput.propTypes = {
  size: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string)
};

TextInput.defaultProps = {
  size: '12',
  placeholder: '',
  errors: []
};
export default TextInput;
