export class TaskRepo {
  public tasks: Task[] = [];

  create(input: CreateTaskInput) {
    this.tasks.push({
      title: input.title,
      description: input.description,
      status: TaskStatus.INCOMPLETE,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

type Task = {
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
};

enum TaskStatus {
  INCOMPLETE = 'INCOMPLETE',
  COMPLETE = 'COMPLETE',
}

type CreateTaskInput = {
  title: string;
  description: string;
};
