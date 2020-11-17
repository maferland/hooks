import * as React from 'react'

// First version from Kent C. Dodds
// https://github.com/kentcdodds/react-hooks/blob/b8dbfcb44051ca374f5528febf2596387f252b44/src/final/02.extra-4.js#L5-L38

// SSR Friendly

const useLocalStorageState = (
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) => {
  const [state, setState] = React.useState(() =>
    typeof defaultValue === 'function' ? defaultValue() : defaultValue,
  )

  React.useEffect(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (!valueInLocalStorage) {
      return
    }
    try {
      setState(deserialize(valueInLocalStorage))
    } catch (error) {
      window.localStorage.removeItem(key)
    }
  }, [])

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

export default useLocalStorageState
