import { print } from "./screen"
import { error } from "../sound"
import { commandFiles, register } from "./command"
import { CommandExec } from "./types"
import { files } from "../files"


const ftp: CommandExec = async (command, [fileName]) => {
  if (!fileName) {
    print(["Usage: FTP <file>\n"])
    return
  }
  const file = [...files, ...commandFiles()].find(f => f.name.toUpperCase() === fileName.toUpperCase())
  if (!file) {
    error()
    print([`Can't find file "${ fileName }"\n`])
    return
  }
  if (file.name.endsWith(".EXE")) {
    error()
    print([
      "SECURITY VIOLATION!\n\n",
      "Downloading executables is forbidden by Aperture\n",
      "Corporate Security Officer.\n\n",
      "This incident is reported.\n\n",
    ])
    return
  }
  const link = document.createElement("a")
  link.download = file.name
  link.href = "/files/" + file.name
  link.click()
}


register({
  name:        "FTP",
  date:        new Date("1984-06-18T04:12:00Z"),
  size:        172201,
  description: "Download file",
  execute:     ftp,
})
