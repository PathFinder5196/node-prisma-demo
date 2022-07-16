import addPreference from './addPreference';
import getUser from './getUser';

const preference = {
  '/user/preference': {
    ...addPreference,
  },
  '/user/': {
    ...getUser,
  },
};

export default preference;
