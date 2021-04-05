import { clear } from "./screen"
import { register } from "./command"


register({
  name:        "CLS",
  description: "Clear screen",
  execute:     (command, [theme]) => clear(),
})
