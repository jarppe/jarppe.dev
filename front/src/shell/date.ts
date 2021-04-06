import { format } from "date-fns"
import { print } from "./screen"
import { register } from "./command"


register({
  name:        "DATE",
  description: "Print system date",
  execute:     async () => print([format(new Date(), "MM/dd/yyyy hh:mm aa")], "Enter"),
})
