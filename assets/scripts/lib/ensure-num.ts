export default function ensureNum(x: string | number, float: boolean = false) {
  if (typeof x === 'number') {
    return x
  } else {
    return float ? parseFloat(x) : parseInt(x, 10)
  }
}
