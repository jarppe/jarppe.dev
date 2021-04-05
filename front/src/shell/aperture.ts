import { print } from "./screen"

const message = [
  "              .,-:;//;:=,\n",
  "          . :H@@@MM@M#H/.,+%;,\n",
  "       ,/X+ +M@@M@MM%=,-%HMMM@X/,\n",
  "     -+@MM; $M@@MH+-,;XMMMM@MMMM@+-\n",
  "    ;@M@@M- XM@X;. -+XXXXXHHH@M@M#@/.\n",
  "  ,%MM@@MH ,@%=            .---=-=:=,.\n",
  "  =@#@@@MX .,      WE      -%HX$$%%%+;\n",
  " =-./@M@M$         DO       .;@MMMM@MM:\n",
  " X@/ -$MM/        WHAT        .+MM@@@M$\n",
  ",@M@H: :@:         WE         . =X#@@@@-\n",
  ",@@@MMX, .        MUST        /H- ;@M@M=\n",
  ".H@@@@M@+,      BECAUSE       %MM+..%#$.\n",
  " /MMMM@MMH/.       WE         XM@MH; =;\n",
  "  /%+%$XHH@$=     CAN      , .H@@@@MX,\n",
  "   .=--------.           -%H.,@@@@@MX,\n",
  "   .%MM@@@HHHXX$$$%+- .:$MMX =M@@MM%.\n",
  "     =XMMM@MM@MM#H;,-+HMM@M+ /MMMX=\n",
  "       =%@M@M#@$-.=$@MM@@@M; %M%=\n",
  "         ,:+$+-,/H#MMMMMMM@= =,\n",
  "               =++%%%%+/:-.\n",
]


export const aperture = (command: string, args: string[]) => {
  print(message)
}
