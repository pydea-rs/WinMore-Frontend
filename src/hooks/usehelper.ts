export const useHelper = () => {
  const formatNumber = (input: string) => {
    const cleanedValue = input.replace(/,/g, '')
    return Number(cleanedValue)
  }

  const addDecimalNumbers = (num1: number, num2: number) => {
    const sum = parseFloat(num1.toString()) + parseFloat(num2.toString())
    return sum.toString()
  }

  const subDecimalNumbers = (num1: number, num2: number) => {
    const sum = num1 < 1 ? 0 : parseFloat(num1.toString()) - parseFloat(num2.toString())
    return sum.toString()
  }

  return { formatNumber, addDecimalNumbers, subDecimalNumbers }
}
