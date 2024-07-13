import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import CommandsUtils from "../utils/commands/commandsUtils";

CommandsUtils.add({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  execute: async (interaction) => {
    await(interaction as ChatInputCommandInteraction).reply(
      `Pong! Latence: \`${Date.now() - interaction.createdTimestamp}ms\``
    );
  },
});
