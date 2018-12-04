import course from '../../src/reducers/course';
import { course as defaultCourse } from '../../src/reducers/default';
import {
  FETCH_ALL_COURSES,
  NEW_COURSE_CREATED,
  CREATING_COURSE,
  COURSE_UPDATED,
  DELETE_COURSE
} from '../../src/actions/types';

const actions = {
  allCourses: {
    type: FETCH_ALL_COURSES,
    courses: [{ id: 'fc', title: 'First Course' }, { id: 'sc', title: 'Second Course' }]
  },
  createCourse: {
    type: NEW_COURSE_CREATED,
    inPage: 3
  }
};
describe('Course Reducer', () => {
  it('should return default state', () => {
    expect(course(undefined, {})).toEqual(defaultCourse);
  });

  it('should return all courses', () => {
    const { courses } = actions.allCourses;
    const newState = course(undefined, { type: FETCH_ALL_COURSES, courses });
    expect(newState.courses).toEqual(courses);
    expect(newState.event).toEqual(FETCH_ALL_COURSES);
  });

  it('should update event for course', () => {
    expect(course(undefined, { type: CREATING_COURSE })).toEqual({ ...defaultCourse, event: CREATING_COURSE });
  });

  it('should add course to existing courses', () => {
    const newState = course(undefined, actions.createCourse);
    expect(newState.event).toEqual(NEW_COURSE_CREATED);
  });

  it('should update course', () => {
    const newState = course(
      { courses: actions.allCourses.courses },
      { type: COURSE_UPDATED, course: { id: 'sc', title: 'Shining New Course' } }
    );
    const newCourses = newState.courses;
    const lastCourse = newCourses[newCourses.length - 1];

    expect(newState.event).toEqual(COURSE_UPDATED);
    expect(lastCourse.title).toEqual('Shining New Course');
  });

  it('should delete course', () => {
    const newState = course(
      { courses: actions.allCourses.courses },
      { type: DELETE_COURSE, courseId: 'sc' }
    );
    const newCourses = newState.courses;
    expect(newCourses.length).toEqual(actions.allCourses.courses.length - 1);
  });
});
