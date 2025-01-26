export const toCapitalCase = (phrase?: string) =>
  phrase?.length
    ? phrase
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    : ''
