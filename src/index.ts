import { Express, Request, Response, NextFunction } from 'express';
import express = require('express');
import { createConnection } from 'typeorm';
import HttpRequestError from './api/classes/HttpRequestError';
import routes from './api/config/routes';

let app: Express;

createConnection()
  .then(async connection => {
    app = express();

    app.use(express.urlencoded());
    app.use(express.json());

    routes(app);

    app.use((error: HttpRequestError, req: Request, res: Response, next: NextFunction) => {
      res.status(error.status || 500);
      res.json({
        error: {
          message: error.message,
        },
      });
    });

    app.get('*', (req, res) => {
      res.status(404).json({
        error: '404',
      });
    });

    const port = process.env.PORT || 4000;

    console.log(process.env);

    app.listen(port, () => {
      return console.log(`server is listening on ${port}`);
    });
  })
  .catch(error => console.log('TypeORM Error: ', error));

export default app;
