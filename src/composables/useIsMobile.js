import { useMediaQuery } from '@vueuse/core'

const MOBILE_QUERY = '(max-width: 800px), ((max-width: 1024px) and (pointer: coarse))'

export function useIsMobile() {
  return useMediaQuery(MOBILE_QUERY)
}

export { MOBILE_QUERY }
