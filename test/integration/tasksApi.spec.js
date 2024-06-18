
import { expect } from 'chai';
import express from "express";
import tasksRouter from "../../src/api/task/index.js"
const app = express();
app.use(express.json());
app.use('/tasks', tasksRouter);
import request from "supertest";
import { taskStatus } from '../../src/helper/common/helper.js';
describe('Tasks API', () => {
    it('should create a new task', async () => {
      const taskData = { title: 'New Task', description: 'Task description' };
      const res = await request(app).post('/tasks').send(taskData);
      
      expect(res.status).to.equal(201);
      expect(res.body).to.include({ title: 'New Task', description: 'Task description', status: taskStatus.active });
    });
  
    it('should retrieve all tasks', async () => {
      const res = await request(app).get('/tasks');
      
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(1);  // Assuming the above test has already added one task
    });
  });