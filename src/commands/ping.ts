import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import ClientUtils from "../utils/clientUtils";

ClientUtils.addCommands({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  execute: async (interaction) => {
    await (interaction as ChatInputCommandInteraction).reply("Pong!");
  },
});