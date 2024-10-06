export const createNumberArray = (from: number, to: number): number[] => {
  if (from > to) {
    throw new Error("'from' should be less than or equal to 'to'")
  }

  return Array.from({ length: to - from + 1 }, (_, i) => from + i)
}
