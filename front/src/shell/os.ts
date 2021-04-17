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
    print(["Bad command or file name: ", commandLine, "\n"], ["Try HELP\n\n"])
    return
  }
  await command.execute(commandName, args)
}
