import { toast } from 'react-toastify'

export function truncate(text: string, maxLength: number, truncationStyle: 'end' | 'center' = 'end') {
  if (text.length <= maxLength) {
    return text
  }

  switch (truncationStyle) {
    case 'end':
      return text.substring(0, maxLength) + '...'
    case 'center':
      const halfLength = Math.floor(maxLength / 2)
      const firstHalf = text.substring(0, halfLength)
      const secondHalf = text.substring(text.length - halfLength)
      return firstHalf + '...' + secondHalf
    default:
      throw new Error('Invalid truncation style')
  }
}

export function toCapitalCase(phrase?: string) {
  return phrase?.length
    ? phrase
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    : ''
}

export const copyToClipboard = async (text: string) => {
  try {
    if (text?.length) {
      await navigator.clipboard.writeText(text)
      toast.success('Copied!.')
    }
  } catch (err) {
    toast.error('Copy Failed! Maybe try again after refresh!')
  }
}
