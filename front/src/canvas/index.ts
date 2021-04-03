import * as PIXI from "pixi.js"
import { tick, setSize } from "./stage"

export const startCanvas = (canvasParent: HTMLElement) => {
  const renderer = new PIXI.Renderer({
    width:           window.innerWidth,
    height:          window.innerHeight,
    resolution:      1,
    backgroundAlpha: 0.0,
    antialias:       true,
  })

  canvasParent.appendChild(renderer.view)

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
}

