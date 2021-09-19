import express, { Response, Request, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';

import docs from '../docs';
import greenhouseGasRouter from './routes/greenhouseGasRoutes';

const app = express();

const corsoptions: cors.CorsOptions = {
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'PATCH'],
  credentials: true,
};

app.enable('trust proxy');
app.use(cors(corsoptions));
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  console.log('Origin: ', req.headers['origin']);
  next();
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message:
      'use https://greenhousegas-server.herokuapp.com/api-docs to get started with docs',
  });
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
app.use('/api/v1/countries', greenhouseGasRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'fail',
    message: `can't find ${req.originalUrl} on this server !!!`,
  });
});

// app.use(errorHandler);

export { app };
