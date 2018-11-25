import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import authorConstraint from '../../validator/author';
import AuthorForm from '../containers/AuthorForm';
import { saveAuthor, resetAuthorEvent } from '../../actions/author';
import { UPDATE_AUTHOR } from '../../actions/types';

class ManageAuthor extends Component {
  static defaultProps = {
    author: {
      firstName: '',
      lastName: ''
    },
    authorEvent: ''
  };

  static propTypes = {
    author: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired
    }),
    authorEvent: PropTypes.string,
    resetAuthorEvent: PropTypes.func.isRequired,
    saveAuthor: PropTypes.func.isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
  };

  state = {
    author: this.props.author, // eslint-disable-line
    errors: {}
  };

  componentDidUpdate(nextProps) {
    const {
      author,
      authorEvent,
      resetAuthorEvent,
      history: { push }
    } = this.props;

    if (nextProps.author !== author) {
      this.setState(() => ({ author })); // eslint-disable-line
    }

    if (authorEvent === UPDATE_AUTHOR) {
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

  onSave = () => {
    const { saveAuthor } = this.props;
    const { author } = this.state;
    const validationError = validate(author, authorConstraint);

    if (validationError) {
      this.setState(() => ({ errors: validationError }));
      return;
    }
    return saveAuthor(author);
  };

  render() {
    const { author, errors } = this.state;
    const { authorEvent } = this.props;
    return (
      <div className="container">
        <h4>Manage Author</h4>
        <AuthorForm errors={errors} author={author} authorEvent={authorEvent} onChange={this.onFormFieldChange} onSave={this.onSave} />
      </div>
    );
  }
}

const findAuthor = (authors, id) => authors.find(author => author.id === id);

const mapStateToProps = (state, props) => {
  const {
    author: { authors, event: authorEvent }
  } = state;
  const {
    params: { id: pathId }
  } = props.match;
  const {
    history: { push }
  } = props;
  let selectedAuthor;

  if (authors.length) {
    selectedAuthor = findAuthor(authors, pathId);
  }

  if (!pathId || (!selectedAuthor && authors.length)) {
    push('/404');
    return {};
  }
  return { author: selectedAuthor, authorEvent };
};
export default connect(
  mapStateToProps,
  { saveAuthor, resetAuthorEvent }
)(ManageAuthor);
