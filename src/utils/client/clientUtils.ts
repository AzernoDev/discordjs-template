import { Client, Events, Interaction } from "discord.js";
import ClientSingleton from "./clientSingleton";
import CommandsSingleton from "../commands/commandsSingleton";

export default class ClientUtils {
  public static run(): void {
    ClientSingleton.client.once(Events.ClientReady, (_client: Client) => {
      console.log(`Logged in as ${_client.user?.tag}`);
    });

    ClientSingleton.client.on(
      Events.InteractionCreate,
      async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = CommandsSingleton.commands.get(interaction.commandName);

        if (!command) {
          console.error(
            `No command matching ${interaction.commandName} was found.`
          );
          return;
        }

        try {
          await command.execute(interaction);
        } catch (error) {
          console.error(error);
          if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
              content: "There was an error while executing this command!",
              ephemeral: true,
            });
          } else {
            await interaction.reply({
              content: "There was an error while executing this command!",
              ephemeral: true,
            });
          }
        }
      }
    );

    ClientSingleton.client.login(process.env.TOKEN);
  }
}
