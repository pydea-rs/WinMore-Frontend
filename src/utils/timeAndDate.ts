export const calculateTime = (time: number): string => {
  if (time < 60) {
    return `${time.toFixed(2)} sec`
  }
  return `${time.toFixed(2)} min`
}

export const getTimePassed = (startTime: Date) => {
  let time = (Date.now() - startTime.getTime()) / 1e3
  const units = [
    { symbol: 's', max: 60 },
    { symbol: 'm', max: 60 },
    { symbol: 'h', max: 24 },
    { symbol: 'd', max: 30 },
    { symbol: 'M', max: 12 },
    { symbol: 'y', max: 0 },
  ]
  let unitIndex = 0
  for (; unitIndex < units.length && units[unitIndex].max && time >= units[unitIndex].max; time /= units[unitIndex++].max);
  return `${time | 0}${units[unitIndex].symbol} ago`
}
