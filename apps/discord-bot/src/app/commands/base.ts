import { Interaction } from 'discord.js';

export abstract class BaseCommand {
  public constructor(public readonly data: object) {}

  public abstract handle(interaction: Interaction): Promise<void>;
}
