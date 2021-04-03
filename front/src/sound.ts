export type Play = () => void

const makeAudio = (name: string): Play => {
  const e = document.getElementById(`sound-${ name }`) as HTMLAudioElement
  if (e == null) {
    throw new Error(`missing sound: "${name}"`)
  }
  return () => e.play()
}

export const error = makeAudio("error")
export const click = makeAudio("click")
