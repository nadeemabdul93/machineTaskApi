import { expect } from 'chai';
import express from "express";
import tasksRouter from "../route/taskRoute.spec.js"
import { taskStatus } from '../../src/helper/common/helper.js';
import request from "supertest";
import mongoose from 'mongoose';
const app = express();
app.use(express.json());
app.use('/tasks', tasksRouter);

describe('Tasks API', () => {
  before(async function() {
    // Connect to the database before running tests
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });
  });

  after(async function() {
    // Disconnect from the database after running tests
    await mongoose.disconnect();
  });
  it('should create a new task', async function() {
    const taskData = { title: 'New Task', description: 'Task description' };
    const res = await request(app)
      .post('/tasks')
      .send(taskData);
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({ status: true, message: 'Task successfully created' });
  });

  it('should retrieve all tasks', async function() {
    // Create a task before retrieving all tasks
    await request(app)
      .post('/tasks')
      .send({ title: 'New Task', description: 'Task description' });

    const res = await request(app)
      .get('/tasks');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.be.an('array').that.is.not.empty;
  });
});
