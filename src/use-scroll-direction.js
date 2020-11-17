import * as React from 'react'

const ScrollDirection = {
  up: 'up',
  down: 'down',
}

// From Reece Lucas
// https://gist.github.com/reecelucas/cd110ece696cca8468db895281fa28cb

const useScrollDirection = props => {
  const {initialDirection = ScrollDirection.up, threshold = 300} = props
  const [scrollDirection, setScrollDirection] = React.useState(initialDirection)

  React.useEffect(() => {
    let lastScrollY = window.pageYOffset
    let ticking = false

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        // We haven't exceeded the threshold
        ticking = false
        return
      }

      setScrollDirection(
        scrollY > lastScrollY ? ScrollDirection.down : ScrollDirection.up,
      )
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir)
        ticking = true
      }
    }

    /**
     * Bind the scroll handler if `off` is set to false.
     * If `off` is set to true reset the scroll direction.
     */
    !off
      ? window.addEventListener('scroll', onScroll)
      : setScrollDirection(initialDirection)

    return () => window.removeEventListener('scroll', onScroll)
  }, [initialDirection, threshold])

  return scrollDirection
}

export {ScrollDirection}
export default useScrollDirection
