import { Client, Events, GatewayIntentBits } from 'discord.js';
import interactionCreateHandlers from './app/interaction-create-handlers';

const { CLIENT_TOKEN } = process.env;

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.on(Events.InteractionCreate, async (interaction) => {
  await Promise.all(
    interactionCreateHandlers.map((handler) => handler(interaction))
  );
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(CLIENT_TOKEN);
