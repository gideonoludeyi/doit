import { TaskRepo } from '../task-repo';
import { CreateTaskCommand } from './create';
import { PingCommand } from './ping';

const taskRepo = new TaskRepo();

export default [new PingCommand(), new CreateTaskCommand(taskRepo)];
