import { Graphics } from "@pixi/graphics"
import { Container } from "@pixi/display"
import { Polygon, Point } from "@pixi/math"


const sin    = Math.sin,
      cos    = Math.cos,
      random = Math.random

let width    = 0,
    height   = 0,
    maxStars = 0

export const setSize = (w: number, h: number) => {
  width = w
  height = h
  maxStars = (width / 30) * (height / 30) * 0.1
}

const starPolygon = (r: number) => new Polygon(
    Array
        .from(Array(10).keys())
        .map(n => [n * (Math.PI * 2) / 10, n & 0x1 ? r : r * 0.4])
        .map(([a, r]) => new Point(r * cos(a), r * sin(a))))

const stage = new Container()


const darker = (c: number, v: number) => {
  const k = v,
        r = ((c >> 16) & 0xff) * k,
        g = ((c >> 8) & 0xff) * k,
        b = (c & 0xff) * k
  return ((r & 0xff) << 16) | ((g  & 0xff) << 8) | (b & 0xff)
}


class Star extends Graphics {
  constructor(t: number) {
    super()
    const z = random(),
          x = random() * width,
          y = 0 - z
    this.lineStyle(1, darker(0x807102, z), 1)
    this.drawShape(starPolygon(3 + z * 20))
    this.x = x
    this.y = y
    this.z = z
    this.created = t
    this.rotationSpeed = -1 + random() * 2
  }

  z: number
  created: number
  rotationSpeed: number

  tick(t: number): boolean {
    const age = t - this.created
    this.y = (age / 20) * this.z
    this.rotation = t / 1000 * this.rotationSpeed
    return (this.y > height) || (this.x > width)
  }
}


export const tick = (ts: number): Container => {
  if (stage.children.length < maxStars && Math.random() < 0.03) {
    stage.addChild(new Star(ts))
  }
  for (const star of stage.children as Star[]) {
    if (star.tick(ts)) {
      stage.removeChild(star)
    }
  }
  return stage
}


//   const s = Math.sin(count),
//         c = Math.cos(count),
//         a = 120,
//         b = 100,
//         m = 20,
//         sm = s * m,
//         cm = c * m,
//         r = 5
//
//   count += 0.02;
//
//   g.clear();
//   g.lineStyle(1, 0x007F26, 0.3);
//
//   g.moveTo(-a + sm, -b + cm);
//   g.lineTo(a + cm, -b + sm);
//   g.lineTo(a + sm, b + cm);
//   g.lineTo(-a + cm, b + sm);
//   g.closePath();
//
//   g.beginFill(0x00ef56, 0.3);
//   g.drawCircle(-a + sm, -b + cm, r)
//   g.drawCircle(a + cm, -b + sm, r)
//   g.drawCircle(a + sm, b + cm, r)
//   g.drawCircle(-a + cm, b + sm, r)
//   g.endFill()
//
//   g.rotation = count * 0.2;


