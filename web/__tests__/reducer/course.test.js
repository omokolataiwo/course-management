import course from '../../src/reducers/course';
import { course as defaultCourse } from '../../src/reducers/default';
import { FETCH_ALL_COURSES, NEW_COURSE_CREATED, CREATING_COURSE } from '../../src/actions/types';

const actions = {
  allCourses: {
    type: FETCH_ALL_COURSES,
    courses: [{ title: 'First Course' }, { title: 'Second Course' }]
  },
  createCourse: {
    type: NEW_COURSE_CREATED,
    course: { title: 'New Course' }
  }
};
describe('course.test Reducer', () => {
  it('should return default state', () => {
    expect(course(undefined, {})).toEqual(defaultCourse);
  });
  it('should return all courses', () => {
    const { courses } = actions.allCourses;
    expect(course({}, actions.allCourses)).toEqual({ courses, event: actions.allCourses.type });
  });

  it('should update event for course', () => {
    expect(course(undefined, { type: CREATING_COURSE })).toEqual({
      courses: [], event: CREATING_COURSE, currentPage: 1, length: 0
    });
  });
  it('should update and add course to existing courses', () => {
    expect(course(undefined, actions.createCourse)).toEqual({
      event: NEW_COURSE_CREATED,
      courses: [actions.createCourse.course],
      currentPage: 1,
      length: 0
    });
  });
});
