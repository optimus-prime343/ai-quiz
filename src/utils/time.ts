const addZero = (num: number) => (num < 10 ? `0${num}` : num)
export const formatTimeDelta = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - hours * 3600) / 60)
  const secs = seconds - hours * 3600 - minutes * 60
  return `${addZero(hours)}h ${addZero(minutes)}m ${addZero(secs)}s`
}
