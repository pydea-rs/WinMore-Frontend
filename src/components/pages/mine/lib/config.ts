export const generateMines = ({ total, value }: { value: number; total: number }): number[] => {
  const mines = value ?? 5
  let numbers: Set<number> = new Set()
  while (numbers.size < mines) {
    let rand = Math.floor(Math.random() * total)
    numbers.add(rand)
  }
  return Array.from(numbers)
}
