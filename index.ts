import "./src/commands/index";
import ClientUtils from "./src/utils/client/clientUtils";
import CommandsUtils from "./src/utils/commands/commandsUtils";

(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
  ClientUtils.run();
  CommandsUtils.register();
})();
