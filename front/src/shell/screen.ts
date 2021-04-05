const buffer: string[] = []


export const print = (...output: (string | string[])[]) => {
  for (const o of output) {
    if (Array.isArray(o)) {
      for (const s of o) {
        for (const ch of s) {
          buffer.push(ch === "\n" ? "Enter" : ch)
        }
      }
    } else {
      buffer.push(o)
    }
  }
}


const ttyElement = document.getElementById("tty")!
const historyElement = document.getElementById("history")!
const bufferElement = document.getElementsByClassName("buffer")[0] as HTMLElement


let maxHistory = Math.floor(ttyElement.offsetHeight / 25),
    line       = ""


ttyElement.addEventListener("resize", () => {
  maxHistory = Math.floor(ttyElement.offsetHeight / 25)
  while (historyElement.childElementCount > maxHistory) {
    historyElement.removeChild(historyElement.firstChild!)
  }
})


const appendLine = (line: string) => {
  if (historyElement.childElementCount > maxHistory) {
    historyElement.removeChild(historyElement.firstChild!)
  }
  const p = document.createElement("p")
  p.innerText = line
  historyElement.appendChild(p)
}


const append = (s: string | Symbol) => {
  switch (s) {
    case "Enter":
      appendLine(line)
      line = ""
      break
    case "Backspace":
      line = line.slice(0, -1)
      break
    case "Clear":
      line = ""
      break
    default:
      line += s
  }
  bufferElement.innerText = line
}


const process = () => {
  const s = buffer.shift()
  if (s) {
    append(s)
  }
}


let turbo = window.localStorage.getItem("screen:turbo") === "ON"
let DELAY = turbo ? 1 : 10
let interval = setInterval(process, DELAY)


export const isTurbo = () => turbo


export const setTurbo = (t: boolean) => {
  turbo = t
  window.localStorage.setItem("screen:turbo", turbo ? "ON" : "OFF")
  DELAY = turbo ? 1 : 10
  clearInterval(interval)
  interval = setInterval(process, DELAY)
}


export const clear = () => {
  for (let c = historyElement.firstChild; c != null; c = historyElement.firstChild) {
    historyElement.removeChild(c)
  }
}
