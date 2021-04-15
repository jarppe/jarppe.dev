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


window.addEventListener("resize", () => {
  maxHistory = Math.floor(ttyElement.offsetHeight / 25)
  console.log(`resize: height: ${ ttyElement.offsetHeight }, history: ${ maxHistory }` )
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

const TURBO_OFF_SPEED = 3,
      TURBO_ON_SPEED = 6

let processCount = 0


export const isTurbo = () => window.localStorage.getItem("jarppe.dev:turbo") === "ON"


export const setTurbo = (turbo: boolean) => {
  window.localStorage.setItem("jarppe.dev:turbo", turbo ? "ON" : "OFF")
  processCount = turbo ? TURBO_ON_SPEED : TURBO_OFF_SPEED
}


setTurbo(isTurbo())


const process = () => {
  for (let i = 0; i < processCount; i++) {
    const s = buffer.shift()
    if (s) {
      append(s)
    } else {
      break
    }
  }
  requestAnimationFrame(process)
}


process()


export const clear = () => {
  for (let c = historyElement.firstChild; c != null; c = historyElement.firstChild) {
    historyElement.removeChild(c)
  }
}
