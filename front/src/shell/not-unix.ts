import { print } from "./screen"
import { register } from "./command"


const notUnix = () => {
  print(["You have mistaken me as Unix system\n"])
}


register({
  name:        "LS",
  description: "User is confused",
  execute:     notUnix,
  secret:      true,
})


register({
  name:        "CAT",
  description: "User is confused",
  execute:     notUnix,
  secret:      true,
})
