import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchAllCourses, saveCourse, fetchCourse } from '../../src/actions/course';
import {
  FETCH_ALL_COURSES, CREATING_COURSE, NEW_COURSE_CREATED, FETCHNING_COURSES
} from '../../src/actions/types';
import courseApi from '../../src/api/mockCourse';

jest.mock('../../src/api/mockCourse');

courseApi.getCoursesByPage = () => new Promise(resolve => resolve({ courses: [{ title: 'First Course' }], length: 3 }));

courseApi.saveCourse = course => new Promise(resolve => resolve({ course, courseIndex: 3 }));

courseApi.getCoursesByCourse = () => new Promise(resolve => resolve({
  courses: [{ title: 'Existing Course' }], length: 3, currentPage: 1
}));
const mockStore = configureStore([thunk]);


describe('course.test', () => {
  it('should fetch all courses', (done) => {
    const expectedAction = [
      { type: FETCHNING_COURSES },
      {
        type: FETCH_ALL_COURSES,
        courses: [{ title: 'First Course' }],
        currentPage: 1,
        length: 3
      }];
    const store = mockStore();

    store.dispatch(fetchAllCourses()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });

  it('should create new course', (done) => {
    const expectedAction = [
      { type: CREATING_COURSE },
      {
        type: NEW_COURSE_CREATED,
        course: { title: 'New Course' },
        inPage: 2
      }];
    const store = mockStore();

    store.dispatch(saveCourse({ title: 'New Course' })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });

  it('should fetch course', (done) => {
    const expectedAction = [
      { type: FETCHNING_COURSES },
      {
        type: FETCH_ALL_COURSES,
        courses: [{ title: 'Existing Course' }],
        currentPage: 1,
        length: 3
      }
    ];
    const store = mockStore();
    store.dispatch(fetchCourse(1, 2)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });
});
