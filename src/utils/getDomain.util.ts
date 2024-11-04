export const getDomain = () => {
  // let domain = window.location.hostname
  // domain = domain.split('.').slice(-2).join('.')
  // domain = '.' + domain
  const domain = process.env.NEXT_PUBLIC_DOMAIN || ''
  return domain
}
