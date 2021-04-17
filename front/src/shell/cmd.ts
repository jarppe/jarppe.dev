import { print } from "./screen"
import { Input, pushHandler } from "./input"
import { execute } from "./os"
import { commandHistoryPush, commandHistoryMove } from "./history"


const prompt = "C:\\> "


let command = ""


export const cmd = async () => {
  print([prompt])
  command = ""
  pushHandler(async ([type, ch]: Input) => {
    switch (type) {
      case "Key":
        command += ch
        print(ch!)
        break
      case "Ctrl-C":
        command = ""
        print(["^C"], "Enter", [prompt])
        break
      case "Backspace":
        if (command.length > 0) {
          command = command.slice(0, -1)
          print(type)
        }
        break
      case "ArrowUp":
      case "ArrowDown":
        const c = commandHistoryMove(type)
        if (c) {
          command = c
          print("Clear", [prompt, command])
        }
        break
      case "Enter":
        print("Enter")
        if (command.length > 0) {
          commandHistoryPush(command)
          await execute(command)
        }
        print([prompt])
        command = ""
        break
    }
  })
}
