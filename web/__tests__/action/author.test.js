import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchAllAuthors, saveAuthor, deleteAuthor, resetAuthorEvent
} from '../../src/actions/author';
import {
  FETCH_ALL_AUTHOR,
  CREATING_AUTHOR,
  CREATE_AUTHOR,
  DELETING_AUTHOR,
  DELETE_AUTHOR,
  RESET_AUTHOR_EVENT
} from '../../src/actions/types';
import authorApi from '../../src/api/mockAuthor';

jest.mock('../../src/api/mockAuthor');
authorApi.getAllAuthors = () => new Promise(resolve => resolve([{ id: 'jmat', firstName: 'John', lastName: 'Martins' }]));

authorApi.saveAuthor = author => new Promise(resolve => resolve({ ...author, id: `${author.firstName}-${author.lastName}` }));

authorApi.deleteAuthor = authorId => new Promise(resolve => resolve(authorId));

const mockStore = configureStore([thunk]);

describe('author action', () => {
  it('should fetch all authors', () => {
    const expectedAction = {
      type: FETCH_ALL_AUTHOR,
      authors: [{ id: 'jmat', firstName: 'John', lastName: 'Martins' }]
    };

    const store = mockStore();
    store.dispatch(fetchAllAuthors()).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  it('should create author', () => {
    const expectedAction = [
      {
        type: CREATING_AUTHOR
      },
      {
        type: CREATE_AUTHOR,
        author: { id: 'John-Martins', firstName: 'John', lastName: 'Martins' }
      }
    ];
    const store = mockStore();

    store
      .dispatch(
        saveAuthor({
          firstName: 'John',
          lastName: 'Martins'
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });

  it('should delete author', () => {
    const expectedAction = [
      {
        type: DELETING_AUTHOR
      },
      { type: DELETE_AUTHOR, authorId: 'John-Martins' }
    ];
    const store = mockStore();

    store
      .dispatch(
        deleteAuthor('John-Martins')
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });

  it('should reset author state', () => {
    const expectedAction = { type: RESET_AUTHOR_EVENT };
    const store = mockStore();
    expect(store.dispatch(resetAuthorEvent())).toEqual(expectedAction);
  });
});
