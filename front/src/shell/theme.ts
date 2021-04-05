import { print } from "./screen"
import { error } from "../sound"
import { register } from "./command"


const themes = ["CLASSIC", "RACE", "AMBER"]


const setTheme = (theme: string) => {
  window.localStorage.setItem("screen:theme", theme)
  const cl = document.body.classList
  cl.remove(...themes.map(t => "theme-" + t.toLowerCase()))
  cl.add("theme-" + theme.toLowerCase())
}


register({
  name:        "THEME",
  description: "Set CRT theme",
  date:        new Date("1984-06-18T04:12:00Z"),
  size:        62914,
  execute:     async (command, [theme]) => {
    if (theme) {
      const t = theme.toUpperCase()
      if (!themes.includes(t)) {
        error()
        print(["Unknown theme\n"])
        return
      }
      setTheme(t)
    } else {
      print([
        "Usage: THEME <theme>\n",
        "Set terminal theme.\n",
        "Supported themes are:\n",
        "  CLASSIC ..... Classic green.\n",
        "                Nostalgic theme for good old times.\n",
        "  RACE ........ Racing red.\n",
        "                Fast and furious for speed enthusiasts.\n",
        "  AMBER ....... Another classic CRT theme.\n",
        "Current theme is ",
        window.localStorage.getItem("screen:theme")!,
        "\n",
      ])
    }
  },
})


setTheme(window.localStorage.getItem("screen:theme") ?? themes[0])
