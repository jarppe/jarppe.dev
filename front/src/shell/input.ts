import { click, error } from "../sound"
import { print } from "./screen"


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


const handlerStack: InputHandler[] = []


export const pushHandler = (h: InputHandler) => {
  handlerStack.unshift(h)
}


export const popHandler = () => {
  handlerStack.shift()
}


const deliver = (s: Input) => {
  const handler = handlerStack[0]
  if (handler) handler(s)
}


const handleKey = async (e: KeyboardEvent) => {
  e.preventDefault()
  click()
  deliver(["Key", e.key])
}


const handleSpecial = async (e: KeyboardEvent) => {
  e.preventDefault()
  click()
  deliver([e.key as Type])
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
    click()
    deliver(["Ctrl-C"])
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
    } else if (key === "Backspace" && e.ctrlKey && (e.metaKey || e.altKey)) {
      print(["\nSystem rebooting..."])
      setTimeout(() => window.location.reload(), 2000)
      return
    } else {
      return
    }
  }
  const eventHandler = eventHandlers.get(key) ?? unknownKey
  await eventHandler(e)
})
