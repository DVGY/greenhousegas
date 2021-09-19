import { getAllCountries } from './getAllCountries';

export = {
  paths: {
    '/countries': {
      ...getAllCountries,
    },
  },
};
