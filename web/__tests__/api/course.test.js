import courseApi from '../../src/api/mockCourse';

jest.useFakeTimers();

const COURSE_TITLE = 'Architecting Applications for the Real World';
const COURSE_ID = 'architecture';
const PAGE_SIZE = 2;

describe('Mock Course', () => {
  it('should get all courses', (done) => {
    courseApi.getCoursesByPage(1, PAGE_SIZE).then(({ courses }) => {
      expect(courses.length).toEqual(PAGE_SIZE);
      expect(courses[0].title).toEqual(COURSE_TITLE);
      done();
    });
    jest.runAllTimers();
  });

  it('should get all courses within the range of selected course', async (done) => {
    courseApi.getCoursesByCourseId(COURSE_ID, PAGE_SIZE).then(({ courses }) => {
      expect(courses.length).toEqual(PAGE_SIZE);
      done();
    });
    jest.runAllTimers();
  });

  it('should return error 404 when course is not found', async (done) => {
    try {
      await courseApi.getCoursesByCourseId(`${COURSE_ID}-WITH-NOT-FOUND`, PAGE_SIZE);
      jest.runAllTimers();
    } catch (e) {
      expect(e).toEqual(new Error('404'));
    }

    done();
  });

  it('should delete a course', (done) => {
    courseApi.deleteCourse(COURSE_ID).then((course) => {
      expect(course[0].title).toEqual(COURSE_TITLE);
      done();
    });

    courseApi.getCoursesByPage(1).then((courses) => {
      expect(courses.length).toEqual(4);
      done();
    });
    jest.runAllTimers();
  });

  it('should save a new course', (done) => {
    courseApi.saveCourse({ title: 'EXPERIMENTAL COURSE' }).then(({ course }) => {
      expect(course.title).toEqual('EXPERIMENTAL COURSE');
      done();
    });

    courseApi.getCoursesByPage().then((courses) => {
      expect(courses.length).toEqual(5);
      done();
    });
    jest.runAllTimers();
  });

  it('should update existing course', (done) => {
    courseApi.saveCourse({ title: `NEW ${COURSE_TITLE}`, id: COURSE_ID }).then(({ course }) => {
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
