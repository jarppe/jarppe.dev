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


const historyElement = document.getElementById("history")!
const bufferElement = document.getElementsByClassName("buffer")[0] as HTMLElement


let line = ""


const appendLine = (line: string) => {
  const p = document.createElement("p"),
        height = window.innerHeight,
        maxLines = Math.floor(height / 24)
  p.innerText = line
  historyElement.appendChild(p)
  if (historyElement.childElementCount > maxLines) {
    historyElement.removeChild(historyElement.firstChild!)
  }
}
window.innerHeight

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


let DELAY = Number.parseInt(window.localStorage.getItem("screen:delay") ?? "10")
let interval = setInterval(process, DELAY)


export const isTurbo = () => DELAY === 3


export const setTurbo = (on: boolean) => {
  DELAY = on ? 3 : 10
  window.localStorage.setItem("screen:delay", DELAY.toString(10))
  clearInterval(interval)
  setInterval(process, DELAY)
}


