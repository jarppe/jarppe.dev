import { register } from "./command"


register({
  name:        "NISOTEM",
  description: "Stuff",
  execute:     async () => { window.location.pathname = "/foo/" },
  secret: true
})
