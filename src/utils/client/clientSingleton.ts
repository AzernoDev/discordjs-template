import { Client, GatewayIntentBits } from "discord.js";

export default class ClientSingleton {
  private static _client: Client;

  public static get client(): Client {
    if (!this._client) {
      this._client = new Client({
        intents: [GatewayIntentBits.Guilds],
      });
    }

    return this._client;
  }
}
