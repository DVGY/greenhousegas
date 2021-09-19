const getAllCountries = {
  // method of operation
  get: {
    tags: ['Green House Gas Read Operations'], // operation's tag.
    description: 'Get All greenhouse gas', // operation's desc.
    operationId: 'getAllGreenhouseGasInfo', // unique operation id.
    parameters: [], // expected params.
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
