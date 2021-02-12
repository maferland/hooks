import * as React from 'react'

const useMounted = () => {
  const [mounted, setMounted] = React.useState < boolean > true
  React.useEffect(() => {
    return () => setMounted(false)
  }, [])
  return mounted
}

export default useMounted
