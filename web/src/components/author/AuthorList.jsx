import React, { Component } from 'react';
import { connect } from 'react-redux';
import notie from 'notie';
import { deleteAuthor, resetAuthorEvent } from '../../actions/author';
import AuthorTableList from '../containers/AuthorTableList';
import { DELETE_AUTHOR_ERROR, DELETE_AUTHOR } from '../../actions/types';

export class AuthorList extends Component {
  state = {};

  static defaultProps = {
    authors: []
  };

  componentDidUpdate() {
    const { authorEvent, resetAuthorEvent } = this.props;

    if (authorEvent === DELETE_AUTHOR_ERROR) {
      notie.alert({
        type: 'error',
        text: 'Author has course. You may want to delete the courses first!',
        time: 4
      });
      resetAuthorEvent();
    }

    if (authorEvent === DELETE_AUTHOR) {
      notie.alert({
        type: 'success',
        text: 'Author Details Deleted'
      });
      resetAuthorEvent();
    }
  }

  onDeleteAuthor = (authorId) => {
    const { deleteAuthor } = this.props;
    deleteAuthor(authorId);
  };

  render() {
    const { authors } = this.props;

    return (
      <div>
        <h2>Registered Authors</h2>
        <AuthorTableList authors={authors} onDeleteAuthor={this.onDeleteAuthor} />
      </div>
    );
  }
}

const mapStateToProps = ({ author: { authors, event: authorEvent } }) => ({ authors, authorEvent });

export default connect(
  mapStateToProps,
  { deleteAuthor, resetAuthorEvent }
)(AuthorList);
