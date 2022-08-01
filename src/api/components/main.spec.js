const { expect } = require('chai');
const app = require('#test/http/setup');

describe('Main router', () => {
  it('should return 200 HTTP code for base call', async () => {
    const response = await app.get('/')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(response.body).to.be.an('object');
    expect(response.body.name).to.be.eqls('Backend');
  });
});
