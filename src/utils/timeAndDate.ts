export const calculateTime = (time: number): string => {
  if (time < 60) {
    return `${time.toFixed(2)} sec`
  }
  return `${time.toFixed(2)} min`
}
