import * as PIXI from "pixi.js"
import "./index.scss"
import "./assets/favicon.ico"
import "./console"
import { tick, setSize } from "./stage"

const renderer = new PIXI.Renderer({
  width:           window.innerWidth,
  height:          window.innerHeight,
  resolution:      window.devicePixelRatio || 1,
  backgroundAlpha: 0.0,
  antialias:       true,
})

document.getElementById("canvas-holder")!.appendChild(renderer.view)

const animate = (ts: number) => {
  renderer.render(tick(ts))
  window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)

window.onresize = () => {
  renderer.resize(window.innerWidth, window.innerHeight)
  setSize(window.innerWidth, window.innerHeight)
}

setSize(window.innerWidth, window.innerHeight)
