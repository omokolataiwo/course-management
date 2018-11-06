import course from '../../src/reducers/course';
import { course as defaultCourse } from '../../src/reducers/default';
import { FETCH_ALL_COURSES } from '../../src/actions/types';

const actions = {
  allCourses: {
    type: FETCH_ALL_COURSES,
    courses: [
      { title: 'First Course' },
      { title: 'Second Course' }
    ]
  }
};
describe('course.test Reducer', () => {
  it('should return default state', () => {
    expect(course(undefined, {})).toEqual(defaultCourse);
  });
  it('should return all courses', () => {
    const { courses } = actions.allCourses;
    expect(course({}, actions.allCourses)).toEqual({ courses });
  });
});
