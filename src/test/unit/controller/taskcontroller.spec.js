import chai from "chai";
import taskController from "../../../api/task/controller"
describe('Task Controller', () => {
    it('should create a new task', () => {
      const newTask = { title: 'New Task', description: 'This is a new task' };
      expect(taskController.createTask(newTask)).to.have.property('id');
    });
  });