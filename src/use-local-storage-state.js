import {useEffect, useRef, useState} from 'react'

// From Kent C. Dodds
// https://github.com/kentcdodds/react-hooks/blob/b8dbfcb44051ca374f5528febf2596387f252b44/src/final/02.extra-4.js#L5-L38

const isBrowser = () => typeof window !== 'undefined'

const useLocalStorageState = (
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) => {
  const lazyLoad = () => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      try {
        return deserialize(valueInLocalStorage)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    }

    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  }
  const [loaded, setLoaded] = useState(false)
  const [state, setState] = useState(() => {
    if (!isBrowser()) {
      return
    }
    const value = lazyLoad()
    setLoaded(true)
    return value
  })

  const prevKeyRef = useRef(key)

  useEffect(() => {
    if (loaded || !isBrowser()) {
      return
    }
    const value = lazyLoad()
    setLoaded(true)
    return value
  }, [])

  useEffect(() => {
    if (!isBrowser()) {
      return
    }

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
