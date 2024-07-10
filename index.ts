import ClientUtils from "./src/utils/clientUtils";
import "./src/commands/ping";

(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
  ClientUtils.runClient();
  ClientUtils.registerCommands();
})();
