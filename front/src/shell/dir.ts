import { print } from "./screen"
import { CommandExec } from "./types"
import { register, commandFiles } from "./command"
import { format } from "date-fns"
import { files } from "../files"


const numberFormat = new Intl.NumberFormat("en-US")


const dir: CommandExec = async (command, args) => {
  print([
    " Volume in drive C: is APRT_TEST\n",
    " Volume Serial Number is C4FE-1337\n",
    "\n",
    " Directory of C:\\\n",
    "\n",
    "05/27/1984  05:24 AM    <DIR>          System\n",
  ])
  const fileList = [ ...files, ...commandFiles() ].sort((a, b) => a.name.localeCompare(b.name))
  let total = 0,
      count = 0
  for (const { name, date, size } of fileList) {
    print([format(date, "MM/dd/yyyy  hh:mm aa")])
    print(["         "])
    print([numberFormat.format(size).padStart(9, " ")])
    print([" ", name, "\n"])
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
