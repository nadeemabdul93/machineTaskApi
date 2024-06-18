import { expect } from 'chai';
// const Task = require('../../models/task');
// import Task from "../../src/model/taskSchema";
import taskSchemaModel from "../../src/model/taskSchema.js"
import Task from '../../src/model/Task.js';
import { taskStatus } from '../../src/helper/common/helper.js';
describe('Task Model', () => {
    it('should create a task with title, description, and status', () => {
      const task = new Task('Test Task', 'This is a test task');
      expect(task.title).to.equal('Test Task');
      expect(task.description).to.equal('This is a test task');
      expect(task.status).to.equal(taskStatus.active); // Use taskStatus.active
    });
  
    it('should mark a task as completed', () => {
      const task = new Task('Test Task', 'This is a test task');
      task.markAsCompleted();
      expect(task.status).to.equal(taskStatus.completed); // Use taskStatus.completed
    });
  });
