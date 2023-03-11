import {
  EmbedBuilder,
  Interaction,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from 'discord.js';
import { TaskRepo } from '../task-repo';
import { BaseCommand } from './base';

const titleField = new SlashCommandStringOption()
  .setName('title')
  .setDescription('title of the task')
  .setRequired(true);

const descriptionField = new SlashCommandStringOption()
  .setName('description')
  .setDescription('description of the task')
  .setRequired(false);

export const data = new SlashCommandBuilder()
  .setName('create')
  .setDescription('creates a task')
  .addStringOption(titleField)
  .addStringOption(descriptionField);

export class CreateTaskCommand extends BaseCommand {
  constructor(private repo: TaskRepo) {
    super(data.toJSON());
  }

  public async handle(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName !== data.name) return;

    const title = interaction.options.getString(titleField.name);
    const description =
      interaction.options.getString(descriptionField.name) ?? '';

    this.repo.create({ title, description });

    let taskEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(title)
      .setTimestamp();

    if (description.length > 0) {
      taskEmbed = taskEmbed.addFields({
        name: 'Description',
        value: description,
      });
    }

    taskEmbed = taskEmbed.addFields({
      name: 'Status',
      value: 'INCOMPLETE',
    });

    await interaction.reply({
      embeds: [taskEmbed],
      ephemeral: true,
    });
  }
}
