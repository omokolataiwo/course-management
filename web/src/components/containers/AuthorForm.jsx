import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import { CREATING_AUTHOR, UPDATING_AUTHOR } from '../../actions/types';

const renderButton = (event, isCreate, onSave) => {
  if (event === CREATING_AUTHOR || event === UPDATING_AUTHOR) {
    return (
      <button
        id="create-author-btn"
        className="btn btn-primary"
        disabled
        type="button"
        onClick={onSave}
      >
        {event === CREATING_AUTHOR ? 'Creating ' : 'Updating '}
        Author
      </button>
    );
  }

  return (
    <button id="create-author-btn" className="btn btn-primary" type="button" onClick={onSave}>
      {isCreate ? 'Create ' : 'Update '}
      Author
    </button>
  );
};
const AuthorForm = ({
  create,
  onSave,
  author: { firstName, lastName },
  onChange,
  authorEvent,
  errors
}) => (
  <form>
    <TextInput
      size="12"
      value={firstName}
      onChange={onChange}
      name="firstName"
      placeholder="First Name"
      errors={errors.firstName}
    />
    <TextInput
      size="12"
      value={lastName}
      onChange={onChange}
      name="lastName"
      placeholder="Last Name"
      errors={errors.lastName}
    />
    {renderButton(authorEvent, create, onSave)}
  </form>
);
AuthorForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  author: PropTypes.shape({ firstName: PropTypes.string, lastName: PropTypes.string }).isRequired,
  create: PropTypes.bool
};

AuthorForm.defaultProps = {
  create: false
};

export default AuthorForm;
