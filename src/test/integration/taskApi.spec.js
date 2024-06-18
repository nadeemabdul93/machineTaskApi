import chai from "chai";

const { expect } = chai.expect;
import request from "supertest";
import app from "../../api/task/index";

describe('Task API', () => {
  it('should fetch all tasks', (done) => {
    request(app)
      .get('/tasks')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Additional integration tests for other API endpoints
});
