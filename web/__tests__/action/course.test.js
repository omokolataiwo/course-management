import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchAllCourses,
  saveCourse,
  fetchCourse,
  deleteCourse,
  resetCourseEvent
} from '../../src/actions/course';
import {
  FETCH_ALL_COURSES,
  CREATING_COURSE,
  NEW_COURSE_CREATED,
  FETCHNING_COURSES,
  DELETING_COURSE,
  DELETE_COURSE,
  RESET_COURSE_EVENT,
  UPDATING_COURSE,
  COURSE_UPDATED
} from '../../src/actions/types';
import {
  course, courses, COURSE_ID, newCourse, coursesResponse
} from '../__mocks__/mockData';
import { PAGE_SIZE } from '../../src/const';
import courseApi from '../../src/api/mockCourse';

// MOCK COURSE API
jest.mock('../../src/api/mockCourse');
courseApi.getCoursesByPage = () => new Promise(resolve => resolve(coursesResponse));

courseApi.saveCourse = course => new Promise((resolve) => {
  if (course.id) {
    return resolve(course);
  }
  return resolve({ course, courseIndex: 3 });
});

courseApi.getCoursesByCourseId = () => new Promise(resolve => resolve({
  courses,
  length: 3,
  currentPage: 1
}));

courseApi.deleteCourse = courseId => new Promise(resolve => resolve({ courseId }));

const mockStore = configureStore([thunk]);
let store;

describe('course.test', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('should fetch all courses', async (done) => {
    const expectedAction = [
      { type: FETCHNING_COURSES },
      {
        type: FETCH_ALL_COURSES,
        courses,
        currentPage: 1,
        length: 3
      }
    ];

    await store.dispatch(fetchAllCourses());
    expect(store.getActions()).toEqual(expectedAction);
    done();
  });

  it('should create new course', async (done) => {
    const expectedAction = [
      { type: CREATING_COURSE },
      {
        type: NEW_COURSE_CREATED,
        course: newCourse,
        inPage: 2
      }
    ];

    await store.dispatch(saveCourse(newCourse));
    expect(store.getActions()).toEqual(expectedAction);
    done();
  });

  it('should fetch course', async (done) => {
    const expectedAction = [
      { type: FETCHNING_COURSES },
      {
        type: FETCH_ALL_COURSES,
        courses,
        currentPage: 1,
        length: 3
      }
    ];

    await store.dispatch(fetchCourse(COURSE_ID, PAGE_SIZE));
    expect(store.getActions()).toEqual(expectedAction);
    done();
  });

  it('should delete course', async (done) => {
    const expectedAction = [
      { type: DELETING_COURSE },
      {
        type: DELETE_COURSE,
        courseId: COURSE_ID
      }
    ];
    await store.dispatch(deleteCourse(COURSE_ID));
    expect(store.getActions()).toEqual(expectedAction);
    done();
  });

  it('should reset course action state', async (done) => {
    const expectedAction = [{ type: RESET_COURSE_EVENT }];
    await store.dispatch(resetCourseEvent());
    expect(store.getActions()).toEqual(expectedAction);
    done();
  });

  it('should update course', async (done) => {
    const expectedAction = [
      { type: UPDATING_COURSE },
      { type: COURSE_UPDATED, course: { ...course, title: 'Learn Promo' } }
    ];
    await store.dispatch(saveCourse({ ...course, title: 'Learn Promo' }));
    expect(store.getActions()).toEqual(expectedAction);
    done();
  });
});
