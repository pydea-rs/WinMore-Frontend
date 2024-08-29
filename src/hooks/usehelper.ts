export const useHelper = () => {
  const formatNumber = (input: string) => {
    const cleanedValue = input.replace(/,/g, '')
    return cleanedValue
  }

  const addDecimalNumbers = (num1: string, num2: string) => {
    const sum = parseFloat(num1) + parseFloat(num2)
    return sum.toString()
  }

  const subDecimalNumbers = (num1: string, num2: string) => {
    const sum = parseFloat(num1) - parseFloat(num2)
    return sum.toString()
  }

  return { formatNumber, addDecimalNumbers, subDecimalNumbers }
}
