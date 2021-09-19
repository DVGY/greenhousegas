import mongoose, { Document, Model, Query } from 'mongoose';

const greenhouseGasSchema = new mongoose.Schema<IGreenhouseGas>(
  {
    countryOrArea: {
      type: String,
      require: [true, 'A greenhouse gas must have a country'],
    },
    year: Number,
    value: Number,
    category: String,
    pollutant: String,
    pollutantName: String,
    createdAt: {
      type: Date,
      default: new Date(),
      select: false,
    },
  },
  {
    toJSON: {},
    toObject: {},
  }
);

//---------------------------------------------------//
//--------------------INTERFACES---------------------//
//--------------------------------------------------//

export interface IGreenhouseGas extends Document {
  countryOrArea: string;
  year: number;
  value: number;
  category: string;
  pollutant: string;
  pollutantName: string;
  createdAt: Date;
}

//--------------------------------------------------//
//             PRE MIDDLEWARE                       //
//--------------------------------------------------//

const GreenhouseGas = mongoose.model<IGreenhouseGas>(
  'GreenhouseGas',
  greenhouseGasSchema
);

export default GreenhouseGas;
