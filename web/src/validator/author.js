export default {
  firstName: {
    presence: true,
    length: {
      minimum: 3,
      tooShort: 'is too short'
    }
  },
  lastName: {
    presence: true,
    length: {
      minimum: 3,
      tooShort: 'is too short'
    }
  }
};
