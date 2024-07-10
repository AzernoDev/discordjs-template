import { Interaction, SlashCommandBuilder } from "discord.js";

type Command = {
  data: SlashCommandBuilder;
  execute: (interaction: Interaction) => Promise<void>;
};

export default Command;