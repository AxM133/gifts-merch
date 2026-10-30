const px = (n) => `${(n / 19.2).toFixed(3)}vw`

export const mediaPresets = {
  girls: { left: 920, top: 287, width: 720 },
  hoodie: { left: 1160, top: 275, width: 555 },
  hoodies: { left: 990, top: 255, width: 820 },
  jacket: { left: 1147, top: 307, width: 500, rounded: true },
  woman: { left: 953, top: 291, width: 771, rounded: true },
  box: { left: 807, top: 253, width: 1063 },
  team: { left: 907, top: 287, width: 880 },
}

export function mediaStyle(preset) {
  const p = mediaPresets[preset] ?? mediaPresets.girls
  return { '--hero-left': px(p.left), '--hero-top': px(p.top), '--hero-w': px(p.width) }
}

export const HERO_MIN_HEIGHT = '44.4vw'
