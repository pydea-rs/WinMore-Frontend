export const generateMines = ({ total, mines }: { mines: number; total: number }): number[] => {
  let numbers: Set<number> = new Set()
  while (numbers.size < mines) {
    let rand = Math.floor(Math.random() * total)
    numbers.add(rand)
  }
  return Array.from(numbers)
}
