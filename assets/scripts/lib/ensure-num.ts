export default function ensureNum(x: string | number, float: boolean = false) {
  if (typeof x === 'number') {
    return x
  } else {
    return float ? parseFloat(x) : parseInt(x, 10)
  }
}

export function isNum(x: string) {
  if (x.length > 0 && x.match(/^[0-9]*$/)) {
    return true
  }

  return false
}
