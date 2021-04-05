import { print } from "./screen"
import { cmd } from "./cmd"
import { setHandler } from "./input"

print([
  "Aperture Professional Computer - BIOS 1.337\n",
  "Copyright Aperture Laboratories, Inc., 1982\n",
  "\n",
  "MS-DOS v2.02a\n",
  "Copyright Microsoft Corp., 1981\n",
  "\n"])

setHandler(cmd())
