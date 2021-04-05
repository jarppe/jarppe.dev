import { File } from "./types"
import fileList from "./files.json"


export const files: File[] = fileList.map(f => {
  return {
    ...f,
    date: new Date(f.date)
  }
})
