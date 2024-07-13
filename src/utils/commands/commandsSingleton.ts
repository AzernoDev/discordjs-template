import Command from "../../types/commands";

export default class CommandsSingleton {
  private static _commands: Map<string, Command>;

  public static get commands(): Map<string, Command> {
    if (!this._commands) {
      this._commands = new Map();
    }

    return this._commands;
  }
}
