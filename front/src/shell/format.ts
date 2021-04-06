import { print } from "./screen"
import { error } from "../sound"
import { CommandExec } from "./types"
import { register } from "./command"
import { InputHandler, popHandler, pushHandler } from "./input"
import { sleep, sleepForever } from "./util"


let aborted = false


const formattingHandler: InputHandler = async ([type]) => {
  switch (type) {
    case "Ctrl-C":
      aborted = true
  }
}


const format: CommandExec = async (command, [drive]) => {
  if (!drive) {
    print(["Usage: FORMAT <disk>\n"])
    return
  }
  if (drive.toUpperCase() !== "C:") {
    error()
    print([
      "ERROR: System can't find disk ",
      drive.toUpperCase(),
      "\n\n",
    ])
    return
  }
  aborted = false
  pushHandler(formattingHandler)
  print(["Formatting drive C:\n"])
  for (let n = 0; n < 12 && !aborted; n++) {
    await sleep(400)
    print(["."])
  }
  if (aborted) {
    print(["^C\n\n"])
    popHandler()
    return
  }
  await sleep(2500)
  print(["\nSystem not found\nAbort, Retry, Fail? "])
  pushHandler(async () => {
    print(["\nSystem not found\nAbort, Retry, Fail? "])
  })
  await sleepForever()
}


register({
  name:        "FORMAT",
  description: "Format disk",
  execute:     format,
})
