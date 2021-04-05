import { print } from "./screen"
import { error } from "../sound"
import { getCommand } from "./command"
import "./commands"


export const execute = async (commandLine: string) => {
  const [c, ...args] = commandLine.trim().split(/\s+/),
        commandName  = c.toUpperCase(),
        command      = getCommand(commandName)
  if (!command) {
    error()
    print(["Error: Unknown command. Try 'HELP'\n"])
    return
  }
  await command.execute(commandName, args)
}
