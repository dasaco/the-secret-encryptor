import {} from 'mocha';
import Encryptor, { KEY_LENGTH } from './encryptor';
import { expect } from 'chai';
import { EncryptedData } from './encryptor';

describe('Encryptor testing', () => {
  const encryptionKey = 'ahdwzvvqlvdfcrtwtfqcunahxsotxqhh';
  const value = {
    someData: 'withSomeData',
  };
  let encryptedData: null | EncryptedData = null;

  context('should be able to decrypt and encrypt', function() {
    it('should encrypt correctly', function() {
      encryptedData = new Encryptor().EncryptJSON(encryptionKey, value);

      expect(encryptedData).to.not.be.null;
      expect(encryptedData.data).to.be.a('string');
      expect(encryptedData.iv).to.be.a('string');
    });

    it('should decrypt correctly', function() {
      const decryptedData = new Encryptor().DecryptJSON(encryptionKey, encryptedData.iv, encryptedData.data);

      expect(decryptedData).to.not.be.null;
      expect(decryptedData).to.deep.equal(value);
    });
  });
});
