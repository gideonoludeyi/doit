import {
  ActionRowBuilder,
  Interaction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import pingSlashCommand from './slash-command';

const modalId = 'myModal';
const textInputId = 'myTextInput';

const textInput = new TextInputBuilder()
  .setCustomId(textInputId)
  .setLabel('Ping Input')
  .setStyle(TextInputStyle.Short);

const modal = new ModalBuilder()
  .setCustomId(modalId)
  .setTitle('Ping Modal')
  .addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(textInput)
  );

export async function handler(interaction: Interaction) {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === pingSlashCommand.name) {
      await interaction.showModal(modal);
    }
  } else if (interaction.isModalSubmit()) {
    if (interaction.customId === modal.data.custom_id) {
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
