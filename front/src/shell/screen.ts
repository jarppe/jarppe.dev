const buffer: string[] = []


const DELAY = 10


export const print = (...output: (string | string[])[]) => {
  for (const o of output) {
    if (Array.isArray(o)) {
      for (const s of o) {
        for (const ch of s) {
          buffer.push(ch)
        }
      }
    } else {
      buffer.push(o)
    }
  }
}


const historyElement = document.getElementById("history")!
const bufferElement = document.getElementById("buffer")!


const ENTER = "Enter"
const CLEAR = "Clear"
const BACKSPACE = "Backspace"


let line = ""


const append = (s: string | Symbol) => {
  switch (s) {
    case ENTER:
      const p = document.createElement("p")
      p.innerText = line
      historyElement.appendChild(p)
      line = ""
      break
    case BACKSPACE:
      line = line.slice(0, -1)
      break
    case CLEAR:
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


setInterval(process, DELAY)
