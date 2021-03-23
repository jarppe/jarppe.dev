import * as PIXI from "pixi.js"
import "./index.scss"
import "./assets/favicon.ico"
import Bunny from "./assets/bunny.png"
import "./console"


const app = new PIXI.Application({
  width:           window.innerWidth,
  height:          window.innerHeight,
  resolution:      window.devicePixelRatio || 1,
  backgroundAlpha: 0.0,
})

document.getElementById("canvasHolder")!.appendChild(app.view)

const thing = new PIXI.Graphics();
app.stage.addChild(thing);
thing.x = window.innerWidth / 4;
thing.y = window.innerHeight / 4;

let count = 0;

app.ticker.add(() => {
  const s = Math.sin(count),
        c = Math.cos(count),
        a = 120,
        b = 100,
        m = 20,
        sm = s * m,
        cm = c * m,
        r = 5

  count += 0.02;

  thing.clear();
  thing.lineStyle(1, 0x007F26, 0.3);

  thing.moveTo(-a + sm, -b + cm);
  thing.lineTo(a + cm, -b + sm);
  thing.lineTo(a + sm, b + cm);
  thing.lineTo(-a + cm, b + sm);
  thing.closePath();

  thing.beginFill(0x00ef56, 0.3);
  thing.drawCircle(-a + sm, -b + cm, r)
  thing.drawCircle(a + cm, -b + sm, r)
  thing.drawCircle(a + sm, b + cm, r)
  thing.drawCircle(-a + cm, b + sm, r)

  thing.rotation = count * 0.2;
});


const resize = () => {
  const width = window.innerWidth,
        height = window.innerHeight
  app.view.width = width
  app.view.height = height
  thing.x = width / 4;
  thing.y = height / 4;
}

window.onresize = resize
