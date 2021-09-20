import { greenhouseGasReqQuery } from '../controllers/greenhouseGasController';

export const isValidQueryParamsKeys = (queryParams: greenhouseGasReqQuery) => {
  const queryParamsKeys = [
    'countryOrArea',
    'year',
    'pollutant',
    'sort',
    'limit',
    'field',
    'paginate',
  ];

  for (const queryParamskey in queryParams) {
    const isKeyPresent = queryParamsKeys.includes(`${queryParamskey}`);
    if (!isKeyPresent) {
      return { isValid: false, inValidQueryKey: queryParamskey };
    }
  }

  return { isValid: true, inValidQueryKey: null };
};
