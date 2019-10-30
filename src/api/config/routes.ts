import { Express } from 'express';
import index from '../controllers/index';
import encryptor from '../controllers/encryptor';

export default (app: Express): void => {
  app.get('/', index.getIndex);

  app.post('/store', encryptor.store);
  app.post('/retrieve', encryptor.retrieve);
};
