import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchAllCourses, saveCourse } from '../../src/actions/course';
import { FETCH_ALL_COURSES, CREATING_COURSE, NEW_COURSE_CREATED } from '../../src/actions/types';
import courseApi from '../../src/api/mockCourse';

jest.mock('../../src/api/mockCourse');
courseApi.getAllCourses = () => new Promise(resolve => resolve([{ title: 'First Course' }]));
courseApi.saveCourse = course => new Promise(resolve => resolve(course));
const mockStore = configureStore([thunk]);

describe('course.test', () => {
  it('should fetch all courses', (done) => {
    const expectedAction = [{ type: FETCH_ALL_COURSES, courses: [{ title: 'First Course' }] }];
    const store = mockStore();

    store.dispatch(fetchAllCourses()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });

  it('should create new course', (done) => {
    const expectedAction = [{ type: CREATING_COURSE }, { type: NEW_COURSE_CREATED, course: { title: 'New Course' } }];
    const store = mockStore();

    store.dispatch(saveCourse({ title: 'New Course' })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });
});
