/**
 * Trying to read the DOM immediately after setting it does not work. Trying on next tick
 * does.
 */
export const waitForNextTick = () =>
  new Promise((resolve) => setTimeout(resolve))

export const wait = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms))
