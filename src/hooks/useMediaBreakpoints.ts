export const useMediaBreakpoints = () => {
  const sm = 'only screen and (min-width: 540px)'
  const md = 'only screen and (min-width: 720px)'
  const lg = 'only screen and (min-width: 960px)'
  const xl = 'only screen and (min-width: 1142px)'
  const xxl = 'only screen and (min-width: 1536px)'

  return { sm, md, lg, xl, xxl }
}
