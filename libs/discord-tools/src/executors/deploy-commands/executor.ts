import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { DeployCommandsExecutorSchema } from './schema';

interface CommandsModule {
  default: Array<{ data: SlashCommandBuilder }>;
}

export default async function runExecutor(
  options: DeployCommandsExecutorSchema
) {
  const { default: commands }: CommandsModule = await import(
    options['commands-path']
  );

  const { CLIENT_TOKEN, APPLICATION_ID } = process.env;

  const discordAPI = new REST({ version: '10' }).setToken(CLIENT_TOKEN);

  return discordAPI
    .put(Routes.applicationCommands(APPLICATION_ID), {
      body: commands.map((command) => command.data.toJSON()),
    })
    .then(() => {
      console.log('🚀 Registered Slash Commands!');
      return { success: true };
    })
    .catch((error) => {
      console.error(error);
      return { success: false };
    });
}
