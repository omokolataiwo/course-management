import author from '../../src/reducers/author';
import {
  FETCH_ALL_AUTHOR,
  CREATE_AUTHOR,
  UPDATE_AUTHOR,
  DELETE_AUTHOR,
  DELETE_AUTHOR_ERROR,
  CREATING_AUTHOR
} from '../../src/actions/types';
import { authors as defaultAuthorState } from '../../src/reducers/default';

const authors = [
  { id: 'tmountain', firstName: 'Toni', lastName: 'Mountain' },
  { id: 'jmax', firstName: 'John', lastName: 'Maxwel' }
];

describe('Author Reducer', () => {
  it('should fetch all authors', () => {
    const newState = author(undefined, { type: FETCH_ALL_AUTHOR, authors });
    expect(newState.authors).toEqual(authors);
    expect(newState.event).toEqual(FETCH_ALL_AUTHOR);
  });

  it('should create author', () => {
    const newState = author(undefined, { type: CREATE_AUTHOR, author: authors[0] });
    expect(newState.authors).toEqual([authors[0]]);
    expect(newState.event).toEqual(CREATE_AUTHOR);
  });

  it('should update author', () => {
    const newState = author(
      { ...defaultAuthorState, authors },
      { type: UPDATE_AUTHOR, author: { ...authors[0], lastName: 'Martin' } }
    );
    const newAuthors = newState.authors;
    expect(newAuthors.length).toEqual(2);
    expect(newAuthors[newAuthors.length - 1].lastName).toEqual('Martin');
  });

  it('should delete author', () => {
    const newState = author(
      { ...defaultAuthorState, authors },
      { type: DELETE_AUTHOR, authorId: 'jmax' }
    );
    expect(newState.authors.length).toEqual(authors.length - 1);
  });

  it('should caption deletion error with reason', () => {
    const newState = author(undefined, { type: DELETE_AUTHOR_ERROR, reason: 'Author has course' });
    expect(newState.event).toEqual(DELETE_AUTHOR_ERROR);
    expect(newState.erorr).toEqual('Author has course');
  });

  it('should caption event preloaders', () => {
    const newState = author(undefined, { type: CREATING_AUTHOR });
    expect(newState.event).toEqual(CREATING_AUTHOR);
  });

  it('should return default state', () => {
    expect(author(undefined, {})).toEqual(defaultAuthorState);
  });
});
