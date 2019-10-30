import crypto from 'crypto';

export const CYPHER_ALGORYTHM = 'aes-256-cbc';
export const IV_LENGTH = 16;
export const KEY_LENGTH = 32;

export interface EncryptedData {
  iv: string;
  data: string;
}

export default class Encryptor {
  public EncryptJSON(key: string, data: JSON): EncryptedData {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(CYPHER_ALGORYTHM, Buffer.from(key), iv);

    let encrypted = cipher.update(JSON.stringify(data));
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    console.log({
      data: encrypted.toString('hex'),
      iv: iv.toString('hex'),
    });

    return {
      data: encrypted.toString('hex'),
      iv: iv.toString('hex'),
    };
  }

  public DecryptJSON(key: string, iv: string, data: string): JSON {
    let encryptedData = Buffer.from(data, 'hex');
    let decipher = crypto.createDecipheriv(CYPHER_ALGORYTHM, Buffer.from(key), Buffer.from(iv, 'hex'));

    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return JSON.parse(decrypted.toString());
  }
}
