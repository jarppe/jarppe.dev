import { print } from "./screen"
import { sleep } from "./util"
import { Input, pushHandler } from "./input"
import { execute } from "./os"


const prompt = "C:\\> "
let prevCommand: string | null = null,
    command = ""


const boot = async () => {
  await sleep(1000)
  print(["Loading BIOS"])
  for (let n = 0; n < 5; n++) {
    await sleep(1000)
    print(["."])
  }
  print("Enter")
  await sleep(1000)
  print([
    "\nAperture Professional Computer - BIOS 1.337\n",
    "Copyright Aperture Laboratories, Inc., 1982\n",
    "\n"
  ])
  await sleep(2000)
  print([
    "MS-DOS v2.02a\n",
    "Copyright Microsoft Corp., 1981\n",
    "\n"])
  await sleep(1500)
}


export const cmd = async () => {
  if (window.localStorage.getItem("jarppe.dev:boot") !== "skip") {
    await boot()
  }
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
  })
}
