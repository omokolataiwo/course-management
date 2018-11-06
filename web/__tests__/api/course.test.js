import courseApi from '../../src/api/mockCourse';

jest.useFakeTimers();
const COURSE_TITLE = 'Building Applications in React and Flux';
const COURSE_ID = 'react-flux-building-applications';

describe('Mock Course', () => {
  it('should get all courses', () => {
    courseApi.getAllCourses().then((courses) => {
      expect(courses.length).toEqual(5);
      expect(courses[0].title).toEqual(COURSE_TITLE);
    });
    jest.runAllTimers();
  });

  it('should delete a course', (done) => {
    courseApi.deleteCourse(COURSE_ID).then((course) => {
      expect(course[0].title).toEqual(COURSE_TITLE);
      done();
    });

    courseApi.getAllCourses().then((courses) => {
      expect(courses.length).toEqual(4);
      done();
    });
    jest.runAllTimers();
  });

  it('should save a new course', (done) => {
    courseApi.saveCourse({ title: 'EXPERIMENTAL COURSE' }).then((course) => {
      expect(course.title).toEqual('EXPERIMENTAL COURSE');
      done();
    });

    courseApi.getAllCourses().then((courses) => {
      expect(courses.length).toEqual(5);
      done();
    });
    jest.runAllTimers();
  });

  it('should update existing course', (done) => {
    courseApi.saveCourse({ title: `NEW ${COURSE_TITLE}`, id: COURSE_ID }).then((course) => {
      expect(course.title).toEqual(`NEW ${COURSE_TITLE}`);
      done();
    });
    jest.runAllTimers();
  });

  it('should not save course without title', (done) => {
    expect(courseApi.saveCourse({ title: '' })).rejects.toEqual(
      new Error('Title must be at least 1 characters.')
    );
    done();
    jest.runAllTimers();
  });
});
