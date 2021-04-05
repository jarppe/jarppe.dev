import { print } from "./screen"
import { error } from "../sound"
import { getCommand } from "./command"
import "./help"
import "./dir"
import "./aperture"
import "./not-unix"
import "./theme"
import "./turbo"
import "./cls"


export const execute = (commandLine: string) => {
  const [c, ...args] = commandLine.trim().split(/\s+/),
        commandName  = c.toUpperCase(),
        command      = getCommand(commandName)
  if (!command) {
    error()
    print(["Error: Unknown command. Try 'HELP'\n"])
    return
  }
  command.execute(commandName, args)
}
