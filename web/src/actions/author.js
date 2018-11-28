import authorApi from '../api/mockAuthor';
import * as type from './types';

const fetchAuthorsSuccess = authors => ({ type: type.FETCH_ALL_AUTHOR, authors });
const createAuthorSuccess = author => ({ type: type.CREATE_AUTHOR, author });
const creatingAuthor = () => ({ type: type.CREATING_AUTHOR });
const updatingAuthor = () => ({ type: type.UPDATING_AUTHOR });
const updateAuthorSuccess = author => ({ type: type.UPDATE_AUTHOR, author });
const deletingAuthor = () => ({ type: type.DELETING_AUTHOR });
const deleteAuthorSuccess = authorId => ({ type: type.DELETE_AUTHOR, authorId });
const deleteAuthorError = reason => ({ type: type.DELETE_AUTHOR_ERROR, reason });
const reset = () => ({ type: type.RESET_AUTHOR_EVENT });

export const fetchAllAuthors = () => dispatch => authorApi.getAllAuthors().then(authors => dispatch(fetchAuthorsSuccess(authors)));

export const saveAuthor = authorDetails => (dispatch) => {
  const AUTHOR_ID = authorDetails.id;

  dispatch(AUTHOR_ID ? updatingAuthor() : creatingAuthor());

  return authorApi
    .saveAuthor(authorDetails)
    .then(author => dispatch(AUTHOR_ID
      ? updateAuthorSuccess(author)
      : createAuthorSuccess(author)));
};

export const deleteAuthor = authorId => (dispatch) => {
  dispatch(deletingAuthor());
  return authorApi
    .deleteAuthor(authorId)
    .then(() => dispatch(deleteAuthorSuccess(authorId)))
    .catch((e) => {
      if (e.message === 'AUTHOR_HAS_COURSE') {
        dispatch(deleteAuthorError(e.message));
      }
    });
};

export const resetAuthorEvent = () => dispatch => dispatch(reset());
