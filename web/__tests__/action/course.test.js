import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchAllCourses } from '../../src/actions/course';
import { FETCH_ALL_COURSES } from '../../src/actions/types';
import courseApi from '../../src/api/mockCourse';

jest.mock('../../src/api/mockCourse');
courseApi.getAllCourses = () => new Promise(resolve => resolve([{ title: 'First Course' }]));

const mockStore = configureStore([thunk]);

describe('course.test', () => {
  it('should', (done) => {
    const expectedAction = [{ type: FETCH_ALL_COURSES, courses: [{ title: 'First Course' }] }];
    const store = mockStore();

    store.dispatch(fetchAllCourses()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });
});
