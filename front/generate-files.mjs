import fs from "fs/promises"



const generate = async () => {
  const files = []
  for (const name of await fs.readdir("./assets/files")) {
    const stat = await fs.stat("./assets/files/" + name),
          size = stat.size,
          date = stat.atime.toISOString()
    files.push({ name, size, date, })
  }
  return fs.writeFile("./src/files/files.json", JSON.stringify(files, undefined, "  "))
}


Promise
  .resolve()
  .then(generate)
  .then(() => console.log("Files JSON generated"))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
