export const sleep = (t: number) => new Promise((resolve) => setTimeout(resolve, t))

export const sleepForever = () => new Promise(() => {})
