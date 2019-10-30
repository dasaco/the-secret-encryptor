import {} from 'mocha';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import app from '../../index';
import { getRepository } from 'typeorm';
import { DataItem } from '../../db/entities/DataItem';
import chai from 'chai';

chai.use(chaiHttp);

describe('Requests', () => {
  let data = {
    some: 'secret',
    num: 123,
  };
  let id = 'new-id-for-testing-purposes-123';
  let encryption_key = 'ahdwzvvqlvdfcrtwtfqcunahxsotxqhh';

  it('should store a value', done => {
    chai
      .request(app)
      .post('/store')
      .send({
        encryption_key,
        value: data,
        id,
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.not.be.null;
        expect(res.body.iv).to.be.a('string');
        expect(res.body.data).to.be.a('string');
        done();
      });
  });

  it('should return empty array if the key is wrong', done => {
    chai
      .request(app)
      .post('/retrieve')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.equal([]);
        done();
      });
  });

  after(() => {
    getRepository(DataItem)
      .createQueryBuilder('dataItem')
      .where({ id })
      .delete();
  });
});
