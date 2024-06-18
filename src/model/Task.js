class Task {
  constructor(title, description, status = 'active') {
    this.title = title;
    this.description = description;
    this.status = status;
  }

  markAsCompleted() {
    this.status = 'completed';
  }
}

export default Task;