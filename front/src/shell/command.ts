import { Command, ExternalCommand, isExternalCommand } from "./types"

export const commands = new Map<string, Command>()

export const register = (command: Command) => {
  commands.set(command.name, command)
}


export const getCommand = (commandName: string) => commands.get(commandName)


export const listCommands = (): Command[] => {
  return Array.from(commands.values())
      .filter(c => c.secret !== true)
      .sort((a, b) => a.name.localeCompare(b.name))
}


export const listExternalCommands = (): ExternalCommand[] => {
  return listCommands().filter(c => isExternalCommand(c)) as ExternalCommand[]
}
