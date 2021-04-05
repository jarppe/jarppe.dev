import { print } from "./screen"
import { InputHandler, Input } from "./input"
import { execute } from "./os"

const prompt = "C:\\> "
let prevCommand: string | null = null,
    command = ""


export const cmd = (): InputHandler => {
  print([prompt])
  command = ""
  return async ([type, ch]: Input) => {
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
        if (prevCommand) {
          command = prevCommand
          prevCommand = null
          print("Enter", [prompt, command])
        }
        break
      case "Enter":
        print("Enter")
        if (command.length > 0) {
          prevCommand = command
          await execute(command)
        }
        print([prompt])
        command = ""
        break
    }
  }
}
