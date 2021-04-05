import { click, error } from "../sound"


export type Type = |
    "Space" |
    "Enter" |
    "Backspace" |
    "Escape" |
    "Ctrl-C" |
    "F1" |
    "ArrowUp" |
    "ArrowDown" |
    "ArrowLeft" |
    "ArrowRight"


export type Input = [Type] | ["Key", string]


export type InputHandler = (s: Input) => Promise<void>


type EventHandler = (e: KeyboardEvent) => Promise<void>


let handler: InputHandler | null = null


export const setHandler = (h: InputHandler | null) => handler = h


const handleKey = async (e: KeyboardEvent) => {
  e.preventDefault()
  click()
  if (handler) await handler(["Key", e.key])
}


const handleSpecial = async (e: KeyboardEvent) => {
  e.preventDefault()
  click()
  if (handler) await handler([e.key as Type])
}


const eventHandlers = new Map<string, EventHandler>([
  ["Space", handleSpecial],
  ["Enter", handleSpecial],
  ["Backspace", handleSpecial],
  ["Escape", handleSpecial],
  ["F1", handleSpecial],
  ["ArrowUp", handleSpecial],
  ["ArrowDown", handleSpecial],
  ["ArrowLeft", handleSpecial],
  ["ArrowRight", handleSpecial],
  ["Ctrl-C", async (e: KeyboardEvent) => {
    e.preventDefault()
    if (handler) handler(["Ctrl-C"])
    click()
  }],
])


for (let c = 32; c < 127; c++) {
  eventHandlers.set(String.fromCharCode(c), handleKey)
}


const unknownKey = async (e: KeyboardEvent) => {
  e.preventDefault()
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


let konamiState = 0


document.addEventListener("keydown", async (e) => {
  let key = e.key
  if (key === konamiCode[konamiState]) {
    konamiState++
    if (konamiState === konamiCode.length) {
      console.log("Konami!!!") // TODO: Do some fancy shit
      konamiState = 0
    }
  } else {
    konamiState = 0
  }
  if (e.ctrlKey || e.metaKey) {
    if (key === "c" && e.ctrlKey) {
      key = "Ctrl-C"
    } else if (key === "Backspace" && e.ctrlKey && e.metaKey) {
      console.log("Ctrl-Alt-Del") // TODO: Do some reboot shit
      return
    } else {
      return
    }
  }
  const handler = eventHandlers.get(key) ?? unknownKey
  await handler(e)
})
