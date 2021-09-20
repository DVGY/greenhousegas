const getAllCountries = {
  // method of operation
  get: {
    tags: ['Green House Gas Read Operations'], // operation's tag.
    description: 'Get All greenhouse gas', // operation's desc.
    operationId: 'getAllGreenhouseGasInfo', // unique operation id.
    parameters: [
      {
        name: 'countryOrArea', // name of the param
        in: 'query', // location of the param
        schema: { type: 'string', default: null },
        required: false, // Mandatory param
        description: 'Name of the country', // param desc.
      },
      {
        name: 'year[gte]', // name of the param
        in: 'query', // location of the param
        schema: { type: 'string', default: null },
        required: false, // Mandatory param
        description: 'start year', // param desc.
      },
      {
        name: 'year[lt]', // name of the param
        in: 'query', // location of the param
        schema: { type: 'string', default: null },
        required: false, // Mandatory param
        description: 'end year', // param desc.
      },
      {
        name: 'pollutant', // name of the param
        in: 'query', // location of the param
        schema: { type: 'string', default: null },
        required: false, // Mandatory param
        description: 'Name of the pollutant', // param desc.
      },
      {
        name: 'value', // name of the param
        in: 'query', // location of the param
        schema: { type: 'string', default: null },
        required: false, // Mandatory param
        description: 'observed value of pollutant', // param desc.
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: 'All Green house gases', // response desc.
        content: {
          // content-type
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GreenhouseGas', // Todo model
            },
          },
        },
      },
    },
  },
};

export { getAllCountries };
