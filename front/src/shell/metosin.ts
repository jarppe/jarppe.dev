import { register } from "./command"
import { print } from "./screen"
import { sleep } from "./util"


const metosin = async () => {
  print(["Initiating teleport to Metosin HQ\nTeleport opening"])
  for (let i = 0; i < 3; i++) {
    await sleep(1000)
    print(["."])
  }
  window.location.href = "https://metosin.fi/"
}


register({
  name:        "METOSIN",
  description: "Teleport to Metosin HQ",
  execute:     metosin,
  date:        new Date("2012-01-01T16:04:00Z"),
  size:        5332342,
})
