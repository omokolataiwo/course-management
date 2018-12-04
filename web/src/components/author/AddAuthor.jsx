import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import authorConstraint from '../../validator/author';
import AuthorForm from '../containers/AuthorForm';
import { saveAuthor, resetAuthorEvent } from '../../actions/author';
import { CREATE_AUTHOR } from '../../actions/types';

export class AddAuthor extends Component {
  static propTypes = {
    saveAuthor: PropTypes.func.isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    authorEvent: PropTypes.string.isRequired,
    resetAuthorEvent: PropTypes.func.isRequired
  };

  state = {
    author: {
      firstName: '',
      lastName: ''
    },
    errors: {}
  };

  componentDidUpdate() {
    const {
      authorEvent,
      resetAuthorEvent,
      history: { push }
    } = this.props;

    if (authorEvent === CREATE_AUTHOR) {
      push('/course/authors');
      resetAuthorEvent();
    }
  }

  onFormFieldChange = (event) => {
    const { name, value } = event.target;
    const { author } = this.state;

    const validationError = validate({ ...author, [name]: value }, authorConstraint);

    this.setState(prevState => ({
      author: { ...prevState.author, [name]: value },
      errors: validationError || {}
    }));
  };

  onCreate = (event) => {
    const { saveAuthor } = this.props;
    const { author } = this.state;

    const validationError = validate(author, authorConstraint);

    if (validationError) {
      this.setState(() => ({ errors: validationError }));
      return;
    }
    saveAuthor(author);
  };

  render() {
    const { author, errors } = this.state;
    const { authorEvent } = this.props;

    return (
      <div className="container">
        <h4>Add New Author</h4>
        <AuthorForm
          author={author}
          authorEvent={authorEvent}
          onChange={this.onFormFieldChange}
          onSave={this.onCreate}
          create
          errors={errors}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    author: { event: authorEvent }
  } = state;
  return { authorEvent };
};

export default connect(
  mapStateToProps,
  { saveAuthor, resetAuthorEvent }
)(AddAuthor);
