import { SlashCommandBuilder } from "discord.js";
import ClientUtils from "../utils/clientUtils";

const commands = ClientUtils.commands;

commands.push(
    {
        data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
        async execute(interaction) {
            await interaction.reply('Pong!')
        }        
    }
)