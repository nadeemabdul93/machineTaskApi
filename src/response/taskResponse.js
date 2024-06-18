export default class {
    constructor(instance) {
        this.taskId = instance._id ? instance._id : null;
        this.title = instance.title ? instance.title :null;
        this.description = instance.description ? instance.description : null;
        this.status = instance.status ? instance.status : 'active';

    }
};