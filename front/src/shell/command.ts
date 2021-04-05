import { File } from "../files"
import { Command } from "./types"


const commands = new Map<string, Command>()


export const register = (command: Command) => {
  commands.set(command.name, command)
}


export const getCommand = (commandName: string) => commands.get(commandName)


export const listCommands = () => commands.values()


export const commandFiles = (): File[] => {
  return Array.from(commands.values())
      .filter(c => c.secret !== true && c.date && c.size )
      .map(({ name, size, date }) => ({
        name: name + ".EXE",
        size: size!,
        date: date!
      }))
}
