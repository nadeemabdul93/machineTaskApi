export default class {
    constructor(instance) {
        this.userId = instance._id ? instance._id : null;
        this.email = instance.email ? instance.email :null;
        this.firstName = instance.firstName ? instance.firstName :null;
        this.lastName = instance.lastName ? instance.lastName : null;
        this.userType = instance.userType ? instance.userType : 'user';
        this.token = instance.token ? instance.token : null;
        this.status = instance.status ? instance.status : 'active';

    }
};