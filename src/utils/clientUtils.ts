import { Client, GatewayIntentBits } from "discord.js";
import Command from "../types/commands";

export default class ClientUtils extends Client {
    private static _client: Client;
    private static _commands: Array<Command>;

    public static get client(): Client {
        if(!ClientUtils._client) {
            ClientUtils._client = new Client({ intents: [GatewayIntentBits.Guilds]});
        }

        return ClientUtils._client;
    }

    public static get commands(): Array<Command> {
        if (!ClientUtils._commands) {
            ClientUtils._commands = new Array();
        }

        return ClientUtils._commands;
    }
}