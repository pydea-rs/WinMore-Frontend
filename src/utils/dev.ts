export const isDevelopmentMode = () => {
  return process.env.NODE_ENV.toLowerCase() === 'development'
}
