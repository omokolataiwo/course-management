export const author = { id: 'john-martins', firstName: 'John', lastName: 'Martins' };
export const newAuthor = { firstName: 'John', lastName: 'Martins' };
export const coursesResponse = {
  courses: [
    {
      id: 'first-course',
      title: 'First Course',
      category: 'backend',
      authorId: 'john-martins',
      length: '3:12'
    }
  ],
  length: 3
};
export const { courses } = coursesResponse;
export const newCourse = { title: 'First Course' };
export const course = courses[0];
export const COURSE_ID = 1;
export const authors = [author];
