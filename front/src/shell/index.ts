import { cmd } from "./cmd"

import { sleep } from "./util"
import { print } from "./screen"


const boot = async () => {
  await sleep(1000)
  print(["Loading BIOS"])
  for (let n = 0; n < 5; n++) {
    await sleep(1000)
    print(["."])
  }
  print("Enter")
  await sleep(1000)
  print([
    "\nAperture Professional Computer - BIOS 1.337\n",
    "Copyright Aperture Laboratories, Inc., 1982\n",
    "\n"
  ])
  await sleep(2000)
  print([
    "MS-DOS v2.02a\n",
    "Copyright Microsoft Corp., 1981\n",
    "\n"])
  await sleep(1500)
}


const init = async () => {
  if (window.localStorage.getItem("jarppe.dev:boot") !== "skip") {
    await boot()
  }

  return cmd()
}


init().catch(err => console.error(err))
