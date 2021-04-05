import { print } from "./screen"
import { error } from "../sound"
import { commandFiles, register } from "./command"
import { CommandExec } from "./types"
import { files } from "../files"


const type: CommandExec = async (command, [fileName]) => {
  if (!fileName) {
    print(["Usage: TYPE <file>\n"])
    return
  }
  const file = [ ...files, ...commandFiles() ].find(f => f.name.toUpperCase() === fileName.toUpperCase())
  if (!file) {
    error()
    print([`Can't find file "${ fileName }"\n`])
    return
  }
  if (!file.name.endsWith(".txt")) {
    error()
    print([`Can't print binary file "${ fileName }".\nTry downloading it with FTP command.\n`])
    return
  }
  const response = await window.fetch("/files/" + file.name)
  if (!response.ok) {
    console.error(`can't download file ${ file.name }: ${ response.status }`)
    error()
    print(["Disk read error\n"])
    return
  }
  const body = await response.text()
  print([body], "Enter")
}


register({
  name:        "TYPE",
  date:        new Date("1984-06-18T04:12:00Z"),
  size:        92348,
  description: "Print contents of file",
  execute:     type,
})
