import { print } from "./screen"
import { CommandExec } from "./types"
import { register, listExternalCommands } from "./command"
import { format } from "date-fns"


const numberFormat = new Intl.NumberFormat("en-US")


const dir: CommandExec = (command, args) => {
  print([
    " Volume in drive C: is APRT_TEST\n",
    " Volume Serial Number is C4FE-1337\n",
    "\n",
    " Directory of C:\\\n",
    "\n",
    "05/27/1984  05:24 AM    <DIR>          System\n",
  ])
  let total = 0,
      count = 0
  for (const { name, date, size } of listExternalCommands()) {
    print([format(date, "MM/dd/yyyy  hh:mm aa")])
    print(["         "])
    print([numberFormat.format(size).padStart(9, " ")])
    print([" ", name, ".EXE\n"])
    total += size
    count += 1
  }
  print([
    `               ${ count } File(s)`,
    `      ${ numberFormat.format(total).padStart(9, " ") } bytes\n`,
    "               1 Dir(s)       8,101,417 bytes free\n",
  ])
}


register({
  name:        "DIR",
  description: "List files on drive",
  execute:     dir,
})
