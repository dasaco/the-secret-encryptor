import { Request, Response } from 'express';
import { getManager, getRepository } from 'typeorm';
import { DataItem } from '../../db/entities/DataItem';
import Encryptor, { KEY_LENGTH } from '../services/encryptor';

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { id, encryption_key: encryptionKey, value } = req.body;

  if (!encryptionKey || encryptionKey.length !== KEY_LENGTH) {
    return res.status(200).send([]);
  }

  if (!id || id.trim() === '') {
    return res.status(400).send('No id provided');
  }

  if (!value) {
    return res.status(400).send('No data provided');
  }

  try {
    const encryptedData = new Encryptor().EncryptJSON(encryptionKey, value);

    if (!encryptedData) {
      return res.status(500).send('Error');
    }

    let newDataItem = new DataItem();
    newDataItem.data = encryptedData.data;
    newDataItem.iv = encryptedData.iv;
    newDataItem.id = id;

    await getManager()
      .getRepository(DataItem)
      .insert(newDataItem);

    return res.status(200).send(newDataItem);
  } catch (e) {
    if (e.message && e.message.includes('duplicate key')) {
      return res.status(409).send('ID is not available');
    }

    return res.status(500).send('Error');
  }
};

export const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const { id, decryption_key: decryptionKey } = req.body;

  if (!decryptionKey || decryptionKey.length !== KEY_LENGTH) {
    return res.status(400).send('Invalid key');
  }

  if (!id || id.trim() === '') {
    return res.status(400).send('No id provided');
  }

  try {
    const data = await getRepository(DataItem)
      .createQueryBuilder('dataItem')
      .where('dataItem.id like :id', { id: id.replace('*', '%') })
      .getMany();

    if (!data || data.length <= 0) {
      return res.status(200).send([]);
    }

    const result = data.map((d): JSON => new Encryptor().DecryptJSON(decryptionKey, d.iv, d.data)).filter(i => i);

    return res.status(200).send(result);
  } catch (e) {
    console.log(e);
    return res.status(500).send('Error');
  }
};

export default {
  store,
  retrieve,
};
