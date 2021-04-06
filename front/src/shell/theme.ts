import { print } from "./screen"
import { error } from "../sound"
import { register } from "./command"


type Theme = [string, string[]]


const themes: Theme[] = [
  [
    "CLASSIC", [
    "Classic green.",
    "Nostalgic theme for good old times.",
  ]],
  [
    "RACE", [
    "Racing red.",
    "Fast and furious for speed enthusiasts.",
  ]],
  [
    "AMBER", [
    "Another classic CRT theme.",
  ]],
  [
    "PRINCE", [
    "Purple rain.",
    "Carefully tuned for all fans of the",
    "artist currently known as Prince",
  ]],
]


const setTheme = (theme: string) => {
  window.localStorage.setItem("jarppe.dev:theme", theme)
  const cl = document.body.classList
  cl.remove(...themes.map(t => "theme-" + t[0].toLowerCase()))
  cl.add("theme-" + theme.toLowerCase())
}


register({
  name:        "THEME",
  description: "Set CRT theme",
  date:        new Date("1984-06-18T04:12:00Z"),
  size:        62914,
  execute:     async (command, [t]) => {
    if (t) {
      const theme = t.toUpperCase()
      if (!themes.find(t => t[0] === theme)) {
        error()
        print(["Unknown theme\n"])
        return
      }
      setTheme(theme)
    } else {
      print([
        "Usage: THEME <theme>\n",
        "Set terminal theme.\n",
        "Supported themes are:\n",
      ])
      for (const [theme, [name, ...desc]] of themes) {
        print(["  ", theme, " "])
        for (let n = 0; n < 12 - theme.length; n++) {
          print(["."])
        }
        print([" ", name, "\n"])
        for (const d of desc) {
          print("                ", d, "\n")
        }
      }
      print([
        "Current theme is ",
        window.localStorage.getItem("jarppe.dev:theme")!,
        "\n",
      ])
    }
  },
})


setTheme(window.localStorage.getItem("jarppe.dev:theme") ?? themes[0][0])
