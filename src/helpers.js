export default function timeFormat(duration) {
  const minutes = Math.floor(duration / 60)
  const seconds = Math.floor(duration - minutes * 60)
  let res = ''

  res += minutes + ':' + (seconds < 10 ? '0' : '')
  res += '' + seconds

  return res
}
