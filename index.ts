import { Client, Events } from "discord.js";
import ClientUtils from "./src/utils/clientUtils";

(() => {
    require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`});
    const client = ClientUtils.client;

    client.once(Events.ClientReady, (_client: Client) => {
        console.log(`Logged in as ${_client.user?.tag}`);
    })

    client.login(process.env.TOKEN);
})();