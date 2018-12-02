import authorApi from '../../src/api/mockAuthor';
import { author, newAuthor } from '../__mocks__/mockData';

jest.useFakeTimers();

describe('MOCK AUTHOR', () => {
  it('should fetch all author', (done) => {
    authorApi.getAllAuthors().then((authors) => {
      expect(authors.length).toEqual(3);
      done();
    });
    jest.runAllTimers();
  });

  it('should save new author', (done) => {
    authorApi.saveAuthor(newAuthor).then((response) => {
      expect(response.id).toEqual(author.id);
      done();
    });
    jest.runAllTimers();
  });

  it('should modify existing author', (done) => {
    authorApi.saveAuthor({ ...author, firstName: 'Tony' }).then((response) => {
      expect(response.id).toEqual(author.id);
      expect(response.firstName).toEqual('Tony');
      done();
    });
    jest.runAllTimers();
  });

  it('should not save author with invalid fields', async (done) => {
    authorApi.saveAuthor({ firstName: '', lastName: '' }).catch((e) => {
      expect(e.message).toEqual('First Name must be at least 3 characters.');
    });

    authorApi.saveAuthor({ firstName: 'Toni', lastName: '' }).catch((e) => {
      expect(e.message).toEqual('Last Name must be at least 3 characters.');
      done();
    });
    jest.runAllTimers();
  });

  it('should delete author', (done) => {
    authorApi.deleteAuthor(author.id);
    authorApi.getAllAuthors().then((response) => {
      const rAuthor = response.find(rAuthor => rAuthor.id === author.id);
      expect(rAuthor).toBeFalsy();
      done();
    });
    jest.runAllTimers();
  });

  it('should not delete author that has course', (done) => {
    authorApi.deleteAuthor('cory-house').catch((error) => {
      expect(error.message).toEqual('AUTHOR_HAS_COURSE');
      done();
    });
    jest.runAllTimers();
  });
});
