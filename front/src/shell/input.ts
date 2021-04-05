import { click, error } from "../sound"


export type Key = |
    "Space" |
    "Enter" |
    "Backspace" |
    "Escape" |
    "Shift" |
    "Meta" |
    "Alt" |
    "Control" |
    "CtrlAltDel" |
    "Clear"


export type Input = |
    [Key] |
    ["Key", string]


export type InputHandler = (s: Input) => void


type EventHandler = (e: KeyboardEvent) => void


let handler: InputHandler | null = null


export const setHandler = (h: InputHandler | null) => handler = h


const ignoreEvent = (e: KeyboardEvent) => {
}


const sendKey = (e: KeyboardEvent) => {
  e.preventDefault()
  if (handler) handler(["Key", e.key])
  click()
}


const sendSpecial = (e: KeyboardEvent) => {
  e.preventDefault()
  if (handler) handler([e.key as Key])
  click()
}


const eventHandlers = new Map<string, EventHandler>([
  ["Space", sendSpecial],
  ["Enter", sendSpecial],
  ["Backspace", sendSpecial],
  ["Escape", sendSpecial],
  ["Shift", ignoreEvent],
  ["Meta", ignoreEvent],
  ["Alt", ignoreEvent],
  ["Control", ignoreEvent],
  ["CtrlAltDel", sendSpecial],
  ["Clear", sendSpecial],
])


for (let c = 32; c < 127; c++) {
  eventHandlers.set(String.fromCharCode(c), sendKey)
}


for (let f = 1; f < 13; f++) {
  eventHandlers.set("F" + f, sendSpecial)
}


const unknownKey = (e: KeyboardEvent) => {
  error()
}


const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]


let konami = 0


document.addEventListener("keydown", (e) => {
  let key = e.key
  if (key === konamiCode[konami]) {
    konami++
    console.log("konami", konami)
    if (konami === konamiCode.length) {
      console.log("Konami!!!")
      konami = 0
    }
  } else {
    konami = 0
  }
  if (e.ctrlKey || e.metaKey) {
    if (key === "Backspace" && e.ctrlKey && e.metaKey) {
      key = "CtrlAltDel"
    } else if (key === "c" && e.ctrlKey) {
      key = "Clear"
    } else {
      return
    }
  }
  const handler = eventHandlers.get(key) ?? unknownKey
  return handler(e)
})
