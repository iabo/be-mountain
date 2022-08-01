const { expect } = require('chai');
const { v4: uuidV4 } = require('uuid');
const app = require('#test/http/setup');

describe('Webhooks', () => {
  describe('Solidfi', () => {
    it('it should return error on no data sent', async () => {
      const response = await app.post('/webhooks/solidfi')
        .expect(400)
        .expect('Content-Type', /json/);
      expect(response.body).to.be.an('object');
      expect(response.body.type).to.be.eqls('Webhook/MissingEventType');
    });

    it('should return error with no data', async () => {
      const response = await app.post('/webhooks/solidfi')
        .send({
          eventType: 'test',
        })
        .expect(400)
        .expect('Content-Type', /json/);
      expect(response.body).to.be.an('object');
      expect(response.body.type).to.be.eqls('Webhook/MissingData');
    });

    it('should return OK on a successfull transaction', async () => {
      const response = await app.post('/webhooks/solidfi')
        .send({
          eventType: 'test',
          data: {
            id: `test-${uuidV4()}`,
          },
        })
        .expect(200)
        .expect('Content-Type', /json/);
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.be.eqls('OK');
    });
  });
});
