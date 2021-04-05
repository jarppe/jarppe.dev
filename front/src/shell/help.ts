import { print } from "./screen"
import { CommandExec } from "./types"
import { register, listCommands } from "./command"
import { format } from "date-fns"


const numberFormat = new Intl.NumberFormat("en-US")


const help: CommandExec = (command, args) => {
  print(["Available commands:\n"])
  for (const { name, description } of listCommands()) {
    print([name.padStart(10, " ")])
    print([" .... "])
    print([description, "\n"])
  }
}


register({
  name:        "HELP",
  description: "List commands",
  execute:     help,
})
