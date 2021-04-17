import { print } from "./screen"
import { CommandExec } from "./types"
import { register, listCommands } from "./command"


const help: CommandExec = async (command, args) => {
  print(["Available commands:\n"])
  for (const { name, description, secret } of listCommands()) {
    if (secret !== true) {
      print([name])
      print([` ${ "".padEnd(10 - name.length, ".") } `])
      print([description, "\n"])
    }
  }
}


register({
  name:        "HELP",
  description: "List commands",
  execute:     help,
})
