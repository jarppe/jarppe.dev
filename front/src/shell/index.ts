import { print } from "./screen"
import { cmd } from "./cmd"
import { setHandler } from "./input"

//         <p>Aperture Professional Computer - BIOS 1.337</p>
//         <p>Copyright Aperture Laboratories, Inc., 1982</p>
//         <p></p>
//         <p>MS-DOS v2.02a</p>
//         <p></p>
//         <p></p>

print(
    ["Aperture Professional Computer - BIOS 1.337"], "Enter",
    ["Copyright Aperture Laboratories, Inc., 1982"], "Enter",
    "Enter",
    ["MS-DOS v2.02a"], "Enter",
    ["Copyright Microsoft Corp., 1981"], "Enter",
    "Enter"
)

setHandler(cmd())
