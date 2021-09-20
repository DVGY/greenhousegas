import { NextFunction, Request, Response } from 'express';
import GreenhouseGas, { IGreenhouseGas } from '../models/greenhouseGasModel';
import APIFeatures from '../utils/APIFeatures';
import { isValidQueryParamsKeys } from '../utils/helperFunctions';

export const createGreenhouseGasInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  res.status(201).json({
    status: 'success',
  });
};

export const getAllGreenhouseGasInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const queryProps: greenhouseGasReqQuery = { ...req.query };

  const { isValid, inValidQueryKey } = isValidQueryParamsKeys(queryProps);
  if (!isValid) {
    return next(new Error(`Query parameter ${inValidQueryKey} is not valid`));
  }

  const features = new APIFeatures<IGreenhouseGas, greenhouseGasReqQuery>(
    GreenhouseGas.find(),
    queryProps
  );
  features.filter().sort().limitFields().paginate();

  const greenhouseGas = await features.query;

  res.status(200).json({
    status: 'success',
    results: greenhouseGas.length,
    data: {
      greenhouseGas,
    },
  });
};

export const getGreenhouseGasInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const greenhouseGas = await GreenhouseGas.findById(id);
  res.status(200).json({
    status: 'success',
    data: {
      greenhouseGas,
    },
  });
};

export interface greenhouseGasReqQuery {
  countryOrArea?: string;
  createdAt?: Date;
  pollutant?: string;
  sort?: string;
  limit?: string;
  fields?: string;
  paginate?: string;
  year?: string;
  // [someQueryProp: string]: undefined | string;
}
