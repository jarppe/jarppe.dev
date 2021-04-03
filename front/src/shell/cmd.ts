import { print } from "./screen"
import { InputHandler, Input } from "./input"


const prompt = "C:\\> "
let command = ""


export const cmd = (): InputHandler => {
  print([prompt])
  command = ""
  return ([type, ch]: Input) => {
    switch (type) {
      case "Key":
        command += ch
        print(ch!)
        return
      case "Backspace":
        if (command.length > 0) {
          command = command.slice(0, -1)
          print(type)
        }
        return
      case "Enter":
        if (command.length > 0) {

          console.log("execute:", command)
        }
        print("Enter", [prompt])
        command = ""
        return
    }
  }
}
