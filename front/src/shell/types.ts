export type CommandExec = (command: string, args: string[]) => Promise<void>

export type Command = {
  name: string
  execute: CommandExec
  date?: Date,
  size?: number,
  description: string,
  help?: string
  secret?: boolean
}
