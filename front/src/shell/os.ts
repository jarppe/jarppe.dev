import { print, isTurbo, setTurbo } from "./screen"
import { error } from "../sound"
import { aperture } from "./aperture"


const ws = /\s+/


type Command = (command: string, args: string[]) => void


const help: Command = (command, args) => {
  print(["TODO...\n"])
}


const dir: Command = (command, args) => {
  print([
    " Volume in drive C: is APRT_TEST\n",
    " Volume Serial Number is C4FE-1337\n",
    "\n",
    " Directory of C:\\\n",
    "\n",
    "05/27/1984  05:24 AM    <DIR>          System\n",
    "06/10/1984  04:13 AM            62,210 HELP.EXE\n",
    "06/10/1984  04:13 PM            23,033 THEME.EXE\n",
    "10/10/1984  12:01 PM            72,102 FORMAT.EXE\n",
    "06/10/1984  04:13 PM            42,010 INFO.EXE\n",
    "21/11/1984  07:21 PM            12,929 TURBO.EXE\n",
    "               5 File(s)        234,312 bytes\n",
    "               1 Dir(s)       8,101,417 bytes free\n",
  ])
}


const notUnix: Command = (command, args) => {
  print(["You have mistaken me as Unix system\n"])
}


const themes = ["classic", "race", "amber"]

const theme: Command = (command, [theme]) => {
  if (theme) {
    if (!themes.includes(theme)) {
      print(["Unknown theme"])
      return
    }
    document.body.classList.remove(...themes.map(t => "theme-" + t))
    document.body.classList.add("theme-" + theme)
  } else {
    print([
      "Usage: THEME <theme>\n",
      "Set terminal theme. Supported themes are:\n",
      "  classic ..... Classic green.\n",
      "                Nostalgic theme for good old times.\n",
      "  race ........ Racing red.\n",
      "                Fast and furious for speed enthusiasts.\n",
      "  amber ....... Another classic CRT theme.",
    ])
  }
}

const turbo: Command = (command, [turbo]) => {
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
      print("Turbo ON\n")
      break
    default:
      print([
        "Usage: TURBO ....... Show current turbo mode\n",
        "       TURBO ON .... Set turbo ON\n",
        "       TURBO OFF ... Set turbo OFF\n",
      ])
  }
}

const unknownCommand: Command = (command, args) => {
  error()
  print(["Error: Unknown command. Try 'HELP'\n"])
}


const commands = new Map<string, Command>([
  ["HELP", help],
  ["DIR", dir],
  ["LS", notUnix],
  ["CAT", notUnix],
  ["THEME", theme],
  ["INFO", aperture],
  ["TURBO", turbo],
])


export const execute = (commandLine: string) => {
  const [c, ...args] = commandLine.split(ws),
        commandName  = c.toUpperCase(),
        command      = commands.get(commandName) || unknownCommand
  command(commandName, args)
}
