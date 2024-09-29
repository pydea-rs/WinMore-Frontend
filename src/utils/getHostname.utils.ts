export const getHostName = () => {
  let hostname = window.location.hostname
  hostname = hostname.split('.').slice(-2).join('.')
  return hostname
}
