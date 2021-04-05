export type CommandExec = (command: string, args: string[]) => void

export type InternalCommand = {
  name: string
  execute: CommandExec
  description: string,
  help?: string
  secret?: boolean
}


export type ExternalCommand = {
  name: string
  date: Date,
  size: number,
  execute: CommandExec
  description: string,
  help?: string
  secret?: boolean
}


export type Command = InternalCommand | ExternalCommand


export const isExternalCommand = (c: Command): c is ExternalCommand => {
  return (c as ExternalCommand).date !== undefined
}

export const isInternalCommand = (c: Command): c is InternalCommand => {
  return !isExternalCommand(c)
}

