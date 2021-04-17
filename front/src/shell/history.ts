import { print } from "./screen"
import { register } from "./command"


const commandHistory: string[] = [],
      commandHistoryMaxLength = 10
let commandHistoryPos = 0


export const commandHistoryMove = (d: "ArrowUp" | "ArrowDown"): string | null => {
  const command = (commandHistoryPos < commandHistory.length) ? commandHistory[commandHistoryPos] : null
  commandHistoryPos += d === "ArrowUp" ? 1 : -1
  if (commandHistoryPos < 0) commandHistoryPos = 0
  if (commandHistoryPos > commandHistory.length) commandHistoryPos = commandHistory.length - 1
  return command
}


export const commandHistoryPush = (command: string) => {
  if (command.trim().toUpperCase().localeCompare("HISTORY") === 0) return
  commandHistory.unshift(command)
  commandHistoryPos = 0
  if (commandHistory.length > commandHistoryMaxLength) commandHistory.pop()
}


const printHistory = async () => {
  for (const command of commandHistory.slice(0).reverse()) {
    print([command], "Enter")
  }
  print("Enter")
}


register({
  name:        "HISTORY",
  description: "Print command history",
  execute:     printHistory,
  secret:      true,
})
