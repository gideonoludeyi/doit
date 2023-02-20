import { Client, Events, GatewayIntentBits } from 'discord.js';
import commands from './app/commands';

const { CLIENT_TOKEN } = process.env;

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.on(Events.InteractionCreate, async (interaction) => {
  await Promise.all(commands.map((command) => command.handle(interaction)));
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(CLIENT_TOKEN);
