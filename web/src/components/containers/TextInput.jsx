import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  size, onChange, placeholder, name, value
}) => (
  <div className={`form-group col-md-${size}`}>
    <input type="text" id={name} className="form-control" value={value} name={name} placeholder={placeholder} onChange={onChange} />
  </div>
);

TextInput.propTypes = {
  size: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired
};

TextInput.defaultProps = {
  size: '12',
  placeholder: ''
};
export default TextInput;
