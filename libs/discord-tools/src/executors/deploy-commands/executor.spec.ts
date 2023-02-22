import { DeployCommandsExecutorSchema } from './schema';
import executor from './executor';

const options: DeployCommandsExecutorSchema = {};

describe('DeployCommands Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});