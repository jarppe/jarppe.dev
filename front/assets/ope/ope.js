const form$ = document.getElementById("form"),
      max$  = document.getElementById("max")

const g$ = [0, 1, 2, 3, 4].map(n => [
  document.getElementById(`g${ n }s`),
  document.getElementById(`g${ n }e`),
])


const reset = () => {
  for (const g of g$) {
    g.innerText = ""
  }
}


const update = e => {
  e.preventDefault()
  const value = max$.value.trim()
  if (value === "") return reset()
  const max = Number.parseInt(value, 10),
        b = Math.floor(max / 5)
  for (let n = 1; n < 5; n++) {
    const [s, e] = g$[n]
    s.innerText = (n * b).toString()
    e.innerText = ((n + 1) * b - (n < 4 ? 1 : 0)).toString()
  }
}

form$.onsubmit = update
max$.onvolumechange = update
