const component = {
  components: {
    schemas: {
      // todo model
      GreenhouseGas: {
        type: 'object', // data type
        properties: {
          id: {
            type: 'string', // data-type
            description: 'green house gas identification number', // desc
            example: '6145a6c4991f41fb47f63bfe', // example of an id
          },
          countryOrArea: {
            type: 'string', // data-type
            description: 'Name of Country  or Area', // desc
            example: 'Austria', // example of a title
          },
          year: {
            type: 'number', // data type
            description: 'Year in which data is recorded', // desc
            example: 2015, // example of a completed value
          },
          value: {
            type: 'number', // data type
            description: 'Pollutatant actual value in air', // desc
            example: 343434.111, // example of a completed value
          },
          category: {
            type: 'string', // data type
            description: 'Description about pollutant', // desc
            example:
              'greenhouse_gas_ghgs_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalen', // example of a completed value
          },
          pollutant: {
            type: 'string', // data type
            description: 'Pollutant present in air, (Chemical Formula)', // desc
            example: 'CO2', // example of a completed value
          },
          pollutantName: {
            type: 'string', // data type
            description: 'Name of Pollutant', // desc
            example: 'Carbon Dioxide', // example of a completed value
          },
        },
      },

      // error model
      Error: {
        type: 'object', //data type
        properties: {
          message: {
            type: 'string', // data type
            description: 'Error message', // desc
            example: 'Not found', // example of an error message
          },
          internal_code: {
            type: 'string', // data type
            description: 'Error internal code', // desc
            example: 'Invalid parameters', // example of an error internal code
          },
        },
      },
    },
  },
};

export { component };
