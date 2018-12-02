import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchAllAuthors,
  saveAuthor,
  deleteAuthor,
  resetAuthorEvent
} from '../../src/actions/author';
import {
  FETCH_ALL_AUTHOR,
  CREATING_AUTHOR,
  CREATE_AUTHOR,
  DELETING_AUTHOR,
  DELETE_AUTHOR,
  RESET_AUTHOR_EVENT,
  UPDATING_AUTHOR,
  UPDATE_AUTHOR,
  DELETE_AUTHOR_ERROR
} from '../../src/actions/types';
import { author, newAuthor } from '../__mocks__/mockData';
import authorApi from '../../src/api/mockAuthor';
// MOCK AUTHOR API
jest.mock('../../src/api/mockAuthor');
authorApi.getAllAuthors = () => new Promise(resolve => resolve([author]));
authorApi.saveAuthor = author => new Promise((resolve) => {
  const firstName = author.firstName.toLowerCase();
  const lastName = author.lastName.toLowerCase();
  resolve({ ...author, id: `${firstName}-${lastName}` });
});

authorApi.deleteAuthor = authorId => new Promise((resolve, reject) => {
  if (!authorId) {
    return reject(new Error('AUTHOR_HAS_COURSE'));
  }
  resolve(authorId);
});


const mockStore = configureStore([thunk]);
let store;

describe('author action', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('should fetch all authors', async () => {
    const expectedAction = { type: FETCH_ALL_AUTHOR, authors: [author] };

    await store.dispatch(fetchAllAuthors());
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it('should create author', async () => {
    const expectedAction = [{ type: CREATING_AUTHOR }, { type: CREATE_AUTHOR, author }];

    await store.dispatch(saveAuthor(newAuthor));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should update author', async () => {
    const expectedAction = [
      { type: UPDATING_AUTHOR },
      {
        type: UPDATE_AUTHOR,
        author: {
          ...author,
          firstName: 'John'
        }
      }
    ];
    await store.dispatch(saveAuthor({ ...author, firstName: 'John' }));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should delete author', async () => {
    const expectedAction = [
      { type: DELETING_AUTHOR },
      { type: DELETE_AUTHOR, authorId: author.id }
    ];

    await store.dispatch(deleteAuthor(author.id));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should not delete author with course', async () => {
    const expectedAction = [
      { type: DELETING_AUTHOR },
      { type: DELETE_AUTHOR_ERROR, reason: 'AUTHOR_HAS_COURSE' }
    ];

    expect.assertions(1);
    await store.dispatch(deleteAuthor());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should reset author state', () => {
    const expectedAction = { type: RESET_AUTHOR_EVENT };
    expect(store.dispatch(resetAuthorEvent())).toEqual(expectedAction);
  });
});
