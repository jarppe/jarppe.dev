import { print, isTurbo, setTurbo } from "./screen"
import { CommandExec } from "./types"
import { register } from "./command"


const turbo: CommandExec = (command, [turbo]) => {
  if (turbo == null) {
    print(["Turbo is ", isTurbo() ? "ON" : "OFF", "\n"])
    return
  }
  switch (turbo.toUpperCase()) {
    case "ON":
      setTurbo(true)
      print("Turbo ON\n")
      break
    case "OFF":
      setTurbo(false)
      print("Turbo OFF\n")
      break
    default:
      print([
        "Usage: TURBO ....... Show current turbo mode\n",
        "       TURBO ON .... Set turbo ON\n",
        "       TURBO OFF ... Set turbo OFF\n",
      ])
  }
}


register({
  name:        "TURBO",
  date:        new Date("1984-06-18T04:12:00Z"),
  size:        32102,
  description: "List files on drive",
  execute:     turbo,
})
