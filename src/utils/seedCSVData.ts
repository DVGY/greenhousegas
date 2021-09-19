import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import GreenhouseGas, { IGreenhouseGas } from '../models/greenhouseGasModel';
import mongoose, { Model } from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const greenhouseGasFilePath = path.resolve(
  __dirname,
  '..' + '/assets/greenhouse_gas_inventory.csv'
);

let DB = '';
if (!process.env.MONGO_CONNECTION_STRING) {
  throw new Error('process.env.MONGO_CONNECTION_STRING not defined');
}
if (!process.env.MONGO_PASSWORD) {
  throw new Error('process.env.MONGO_PASSWORD not defined');
}
if (!process.env.MONGO_DEV_DB) {
  throw new Error('process.env.MONGO_DEV_DB not defined');
}

if (!process.env.NODE_ENV) {
  throw new Error('process.env.NODE_ENV not defined');
}

DB = process.env.MONGO_CONNECTION_STRING.replace(
  '<DATABASE>',
  process.env.MONGO_DEV_DB
);

DB = DB.replace('<PASSWORD>', process.env.MONGO_PASSWORD);

const greenhouseGasData: IGreenhouseGasData[] = [];

function writeToCSVFile(greenhouseGasData: IGreenhouseGasData[]) {
  const filename = path.resolve(
    __dirname,
    '..' + '/assets/greenhouse_gas_new_data.csv'
  );

  fs.writeFile(filename, extractAsCSV(greenhouseGasData), (err) => {
    if (err) {
      console.log('Error writing to csv file', err);
    } else {
      console.log(`saved as ${filename}`);
    }
  });
}

function extractAsCSV(greenhouseGasData: IGreenhouseGasData[]) {
  const header = ['country_or_area, year, value, pollutant, pollutantName'];
  const rows = greenhouseGasData.map(
    ({ countryOrArea, year, value, category, pollutant, pollutantName }) =>
      `${countryOrArea}, ${year}, ${value}, ${category}, ${pollutant}, ${pollutantName}`
  );
  return header.concat(rows).join('\n');
}

const extractPollutant = (pollutantDescription: string) => {
  if (pollutantDescription) {
    const pollutantLongName = pollutantDescription.split('_emissions')[0];
    const pollutants = pollutantLongName.split('_');
    const pollutantChemicalName =
      pollutants[pollutants.length - 1].toUpperCase();
    const pollutantName = pollutants.slice(0, -1).join(' ');

    return { pollutantChemicalName, pollutantName };
  }
  return { pollutantChemicalName: null, pollutantName: null };
};

const addMetaDataToCSV = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(`${greenhouseGasFilePath}`)
      .pipe(csv())
      .on('data', function (row) {
        const countryOrArea = row.country_or_area;
        const year = row.year;
        const value = row.value;
        const category = row.category;
        const { pollutantChemicalName: pollutant, pollutantName } =
          extractPollutant(category);

        greenhouseGasData.push({
          countryOrArea,
          year,
          value,
          category,
          pollutant,
          pollutantName,
        });
      })
      .on('end', function () {
        writeToCSVFile(greenhouseGasData);
        return resolve(greenhouseGasData);
      })
      .on('error', function (err) {
        return reject(err);
      });
  });
};

const establisMongooseConnection = async () => {
  try {
    await mongoose.connect(DB);
    console.log('\x1b[32m%s\x1b[0m', ' -> DB connection successfull!');
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', ' -> DB connection FAIL');
    console.log(err);
  }
};

const executeSeedDatabase = async (
  GreenhouseGas: Model<IGreenhouseGas>,
  greenhouseGasData: IGreenhouseGasData[]
): Promise<string> => {
  if (process.argv[2] === '--import') {
    await addMetaDataToCSV();
    await GreenhouseGas.create(greenhouseGasData);
    return Promise.resolve('Import');
  }
  if (process.argv[2] === '--delete') {
    await GreenhouseGas.deleteMany();
    return Promise.resolve('Delete');
  }
  return Promise.reject('Specifiy --import or --delete args');
};

const startSeedData = async () => {
  try {
    await establisMongooseConnection();
    console.log('Import Started');
    const message = await executeSeedDatabase(GreenhouseGas, greenhouseGasData);
    console.log(message + ' Completed');
    process.exit(0);
  } catch (err) {
    console.log('Failed:', err);
    process.exit(1);
  }
};

startSeedData();

interface IGreenhouseGasData {
  countryOrArea: string;
  year: number;
  value: number;
  category: string;
  pollutant: string | null;
  pollutantName: string | null;
}

// ts-node ${pwd}/src/utils/seedCSVData.ts --import
