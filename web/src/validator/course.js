import validate from 'validate.js';

validate.validators.mediaLength = (value, options, key) => {
  const splitTime = value.split(':');
  const hour = splitTime[0] && splitTime[0].length ? +splitTime[0] : NaN;
  const minutes = splitTime[1] && splitTime[1].length ? +splitTime[1] : NaN;

  if (isNaN(hour) || isNaN(minutes) || minutes > 59) {
    return options.message ? [options.message] : [`${key} is not well formatted. Try HH:MM`];
  }
  return null;
};
export default {
  title: {
    presence: true,
    length: {
      minimum: 3,
      tooShort: 'is too short'
    }
  },
  category: {
    presence: true,
    length: {
      minimum: 3,
      tooShort: 'is too short'
    }
  },
  length: {
    presence: true,
    mediaLength: {
      message: 'course length is not well formatted. Try HH:MM'
    }
  }
};
