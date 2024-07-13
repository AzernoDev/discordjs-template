import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import Command from "../../types/commands";
import CommandsSingleton from "./commandsSingleton";

export default class CommandsUtils {
  public static add(...commands: Command[]) {
    commands.forEach((command) => {
      CommandsSingleton.commands.set(command.data.name, command);
    });
  }

  public static register(): void {
    (async () => {
      const rest = new REST().setToken(process.env.TOKEN ?? "");

      console.log(
        `Started refreshing ${CommandsSingleton.commands.size} application (/) commands.`
      );

      const body: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
      CommandsSingleton.commands.forEach((value) =>
        body.push(value.data.toJSON())
      );

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

  public static clean(): void {
    (async () => {
      const rest = new REST().setToken(process.env.TOKEN ?? "");

      console.log(`Started cleaning application (/) commands for all guild.`);

      await rest
        .put(Routes.applicationCommands(process.env.CLIENT_ID ?? ""), {
          body: [],
        })
        .then(() =>
          console.log("Successfully deleted all application commands.")
        )
        .catch(console.error);
    })();
  }
}
