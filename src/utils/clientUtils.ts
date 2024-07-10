import {
  Client,
  Events,
  GatewayIntentBits,
  Interaction,
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import Command from "../types/commands";

export default class ClientUtils extends Client {
  private static _client: Client;
  private static _commands: Map<string, Command>;

  public static get client(): Client {
    if (!ClientUtils._client) {
      ClientUtils._client = new Client({ intents: [GatewayIntentBits.Guilds] });
    }

    return ClientUtils._client;
  }

  public static get commands(): Map<string, Command> {
    if (!ClientUtils._commands) {
      ClientUtils._commands = new Map();
    }

    return ClientUtils._commands;
  }

  public static addCommands(...commands: Command[]) {
    commands.forEach((command) => {
      ClientUtils.commands.set(command.data.name, command);
    });
  }

  public static runClient(): void {
    ClientUtils.client.once(Events.ClientReady, (_client: Client) => {
      console.log(`Logged in as ${_client.user?.tag}`);
    });

    ClientUtils.client.on(
      Events.InteractionCreate,
      async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = ClientUtils.commands.get(interaction.commandName);

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

    ClientUtils.client.login(process.env.TOKEN);
  }

  public static async cleanCommands(): Promise<void> {
    const rest = new REST().setToken(process.env.TOKEN ?? "");

    console.log(`Started cleaning application (/) commands for all guild.`);

    (await ClientUtils.client.guilds.fetch()).forEach(async (guild) => {
      await rest
        .put(
          Routes.applicationGuildCommands(
            process.env.CLIENT_ID ?? "",
            guild.id
          ),
          {
            body: [],
          }
        )
        .then(() => console.log("Successfully deleted all guild commands."))
        .catch(console.error);
    });

    await rest
      .put(Routes.applicationCommands(process.env.CLIENT_ID ?? ""), {
        body: [],
      })
      .then(() => console.log("Successfully deleted all application commands."))
      .catch(console.error);
  }

  public static registerCommands(): void {
    (async () => {
      const rest = new REST().setToken(process.env.TOKEN ?? "");

      console.log(
        `Started refreshing ${ClientUtils.commands.size} application (/) commands.`
      );

      const body: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
      ClientUtils.commands.forEach((value) => body.push(value.data.toJSON()));

      await rest
        .put(Routes.applicationCommands(process.env.CLIENT_ID ?? ""), {
          body,
        })
        .then((data) =>
          console.log(
            `Successfully reloaded ${
              (data as Array<unknown>).length
            } application (/) commands.`
          )
        )
        .catch(console.error);
    })();
  }
}
