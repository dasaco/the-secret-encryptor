import crypto from 'crypto';

export const CYPHER_ALGORITHM = 'aes-256-cbc';
export const IV_LENGTH = 16;
export const KEY_LENGTH = 32;

export interface EncryptedData {
  iv: string;
  data: string;
}

export default class Encryptor {
  public EncryptJSON(key: string, data: any): EncryptedData {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(CYPHER_ALGORITHM, Buffer.from(key), iv);

    let encrypted = cipher.update(JSON.stringify(data));
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return {
      data: encrypted.toString('hex'),
      iv: iv.toString('hex'),
    };
  }

  public DecryptJSON(key: string, iv: string, data: string): JSON | null {
    try {
      let encryptedData = Buffer.from(data, 'hex');
      let decipher = crypto.createDecipheriv(CYPHER_ALGORITHM, Buffer.from(key), Buffer.from(iv, 'hex'));

      let decrypted = decipher.update(encryptedData);
      decrypted = Buffer.concat([decrypted, decipher.final()]);

      return JSON.parse(decrypted.toString());
    } catch (e) {
      console.log(e); // Would go to some logging software
      return null;
    }
  }
}
