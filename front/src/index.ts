import * as PIXI from 'pixi.js'
import './assets/favicon.ico'
import Bunny from './assets/bunny.png'


console.log('Here we go again.')
console.log('PIXI:', PIXI.VERSION)
console.log('Bunny', Bunny.toString())


const app = new PIXI.Application({
  width:           window.innerWidth,
  height:          window.innerHeight,
  backgroundColor: 0x1099bb,
  resolution:      window.devicePixelRatio || 1,
})

document.body.appendChild(app.view)

const container = new PIXI.Container()

app.stage.addChild(container)


// Create a new texture
const texture = PIXI.Texture.from(Bunny.toString())

// Create a 5x5 grid of bunnies
for (let i = 0; i < 25; i++) {
  const bunny = new PIXI.Sprite(texture)
  bunny.anchor.set(0.5)
  bunny.x = (i % 5) * 40
  bunny.y = Math.floor(i / 5) * 40
  container.addChild(bunny)
}

console.log("app.screen.width", app.screen.width)
console.log("window.innerWidth", window.innerWidth)

// Move container to the center
container.x = app.screen.width / 4
container.y = app.screen.height / 4

// Center bunny sprite in local container coordinates
container.pivot.x = container.width / 2
container.pivot.y = container.height / 2

// Listen for animate update
app.ticker.add((delta) => {
  container.rotation += 0.005 * delta
})


const resize = () => {
  app.view.width = window.innerWidth
  app.view.height = window.innerHeight
}

window.onresize = resize

