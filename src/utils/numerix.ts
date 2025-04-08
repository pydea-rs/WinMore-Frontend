export const createNumberArray = (from: number, to: number): number[] => {
  if (from > to) {
    throw new Error("'from' should be less than or equal to 'to'")
  }

  return Array.from({ length: to - from + 1 }, (_, i) => from + i)
}

export const getMinMaxRows = (data: { rows?: number }[]) => {
  let min = data[0].rows || 0
  let max = data[0].rows || 0
  for (const row of data) {
    if (!row?.rows) continue
    if (row.rows > max) max = row.rows
    if (row.rows < min) min = row.rows
  }
  return [min, max]
}
