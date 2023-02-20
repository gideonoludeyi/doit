import {
  ActionRowBuilder,
  Interaction,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');

const textInput = new TextInputBuilder()
  .setCustomId('myTextInput')
  .setLabel('Ping Input')
  .setStyle(TextInputStyle.Short);

const modal = new ModalBuilder()
  .setCustomId('myModal')
  .setTitle('Ping Modal')
  .addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(textInput)
  );

export async function handle(interaction: Interaction) {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === data.name) {
      await interaction.showModal(modal);
    }
  } else if (interaction.isModalSubmit()) {
    if (interaction.customId && interaction.customId === modal.data.custom_id) {
      const textInputValue = interaction.fields.getTextInputValue(
        textInput.data.custom_id
      );
      await interaction.reply({
        content: `Pong with '${textInputValue}'!`,
        ephemeral: true,
      });
    }
  }
}
