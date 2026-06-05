import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const sprinkleRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return

    document.body.classList.add('custom-cursor-active')

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let raf = 0
    let visible = false

    const setHover = (hover: boolean) => {
      document.body.classList.toggle('cursor-hover', hover)
    }

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      if (!visible) {
        currentX = targetX
        currentY = targetY
        visible = true
        sprinkleRef.current?.classList.add('cursor--visible')
        ringRef.current?.classList.add('cursor--visible')
      }
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setHover(!!el.closest('a, button, input, textarea, select, label, [role="button"]'))
    }

    const onLeave = () => {
      visible = false
      sprinkleRef.current?.classList.remove('cursor--visible')
      ringRef.current?.classList.remove('cursor--visible')
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.2
      currentY += (targetY - currentY) * 0.2
      const transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`
      if (sprinkleRef.current) sprinkleRef.current.style.transform = transform
      if (ringRef.current) ringRef.current.style.transform = transform
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.body.classList.remove('custom-cursor-active', 'cursor-hover')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor cursor__ring" aria-hidden="true" />
      <div ref={sprinkleRef} className="cursor cursor__sprinkle" aria-hidden="true" />
    </>
  )
}
