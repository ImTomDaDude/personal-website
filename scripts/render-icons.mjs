import { deflateSync } from 'node:zlib'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const iconDir = join(root, 'src', 'assets', 'icons')

function crc32(buf) {
  let c = ~0
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i]
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1))
  }
  return ~c >>> 0
}

function chunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const name = Buffer.from(type)
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([name, data])))
  return Buffer.concat([length, name, data, crc])
}

function encodePng(width, height, rgba) {
  const stride = width * 4
  const raw = Buffer.alloc((stride + 1) * height)
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

function parseHex(hex) {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 255]
}

function canvas(width, height) {
  const data = Buffer.alloc(width * height * 4)
  function set(x, y, color) {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const i = (y * width + x) * 4
    const srcA = color[3] / 255
    if (srcA >= 1 || data[i + 3] === 0) {
      data[i] = color[0]
      data[i + 1] = color[1]
      data[i + 2] = color[2]
      data[i + 3] = color[3]
      return
    }
    const dstA = data[i + 3] / 255
    const outA = srcA + dstA * (1 - srcA)
    data[i] = Math.round((color[0] * srcA + data[i] * dstA * (1 - srcA)) / outA)
    data[i + 1] = Math.round((color[1] * srcA + data[i + 1] * dstA * (1 - srcA)) / outA)
    data[i + 2] = Math.round((color[2] * srcA + data[i + 2] * dstA * (1 - srcA)) / outA)
    data[i + 3] = Math.round(outA * 255)
  }
  return {
    width,
    height,
    data,
    fill(color) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) set(x, y, color)
      }
    },
    rect(x, y, w, h, color) {
      const x0 = Math.max(0, x)
      const y0 = Math.max(0, y)
      const x1 = Math.min(width, x + w)
      const y1 = Math.min(height, y + h)
      for (let yy = y0; yy < y1; yy++) {
        for (let xx = x0; xx < x1; xx++) set(xx, yy, color)
      }
    },
    polygon(points, color) {
      let minY = Infinity
      let maxY = -Infinity
      for (const point of points) {
        minY = Math.min(minY, point[1])
        maxY = Math.max(maxY, point[1])
      }
      const yStart = Math.max(0, Math.floor(minY))
      const yEnd = Math.min(height - 1, Math.ceil(maxY) - 1)
      for (let y = yStart; y <= yEnd; y++) {
        const scan = y + 0.5
        const xs = []
        for (let i = 0; i < points.length; i++) {
          const [x1, y1] = points[i]
          const [x2, y2] = points[(i + 1) % points.length]
          if ((y1 <= scan && y2 > scan) || (y2 <= scan && y1 > scan)) {
            const t = (scan - y1) / (y2 - y1)
            xs.push(x1 + t * (x2 - x1))
          }
        }
        xs.sort((a, b) => a - b)
        for (let i = 0; i + 1 < xs.length; i += 2) {
          const x0 = Math.max(0, Math.ceil(xs[i] - 1e-6))
          const x1 = Math.min(width - 1, Math.floor(xs[i + 1] - 1e-6))
          for (let x = x0; x <= x1; x++) set(x, y, color)
        }
      }
    },
  }
}

function draw(surface, ops) {
  for (const op of ops) {
    const color = parseHex(op.fill)
    if (op.alpha != null) color[3] = op.alpha
    if (op.t === 'r') surface.rect(op.x, op.y, op.w, op.h, color)
    else surface.polygon(op.points, color)
  }
}

const r = (x, y, w, h, fill) => ({ t: 'r', x, y, w, h, fill })
const poly = (points, fill) => ({ t: 'p', points, fill })

function ame(mood) {
  const ops = []
  if (mood === 'angel') {
    ops.push(
      r(13, 0, 8, 1, '#ffd36a'),
      r(11, 1, 3, 1, '#ffd36a'),
      r(20, 1, 3, 1, '#ffd36a'),
      r(12, 2, 2, 1, '#ffe9a0'),
      r(20, 2, 2, 1, '#ffe9a0'),
    )
  } else {
    ops.push(r(19, 1, 2, 2, '#ff7eb6'), r(18, 3, 2, 2, '#3a3488'))
  }
  ops.push(
    r(11, 4, 12, 2, '#241c52'),
    r(8, 6, 16, 3, '#241c52'),
    r(7, 8, 18, 8, '#2a2468'),
    r(6, 12, 4, 7, '#241c52'),
    r(22, 12, 4, 7, '#241c52'),
    r(8, 18, 3, 3, '#2a2468'),
    r(21, 18, 3, 3, '#2a2468'),
    r(8, 8, 2, 4, '#4c458e'),
    r(10, 9, 12, 11, '#ffd3c6'),
    r(11, 10, 10, 8, '#ffe4da'),
    r(10, 8, 12, 3, '#2a2468'),
    r(16, 8, 3, 5, '#ff7eb6'),
    r(17, 12, 2, 2, '#ff9ac8'),
    r(9, 11, 2, 2, '#ff7eb6'),
  )
  if (mood === 'happy') {
    ops.push(
      r(11, 14, 4, 1, '#2a1840'),
      r(11, 13, 1, 1, '#2a1840'),
      r(14, 13, 1, 1, '#2a1840'),
      r(18, 14, 4, 1, '#2a1840'),
      r(18, 13, 1, 1, '#2a1840'),
      r(21, 13, 1, 1, '#2a1840'),
    )
  } else if (mood === 'wink') {
    ops.push(
      r(11, 13, 3, 3, '#fff'),
      r(12, 14, 2, 2, '#d4236a'),
      r(12, 13, 1, 1, '#fff'),
      r(18, 14, 4, 1, '#2a1840'),
      r(18, 13, 1, 1, '#2a1840'),
      r(21, 13, 1, 1, '#2a1840'),
    )
  } else if (mood === 'sleepy') {
    ops.push(
      r(11, 14, 4, 1, '#2a1840'),
      r(18, 14, 4, 1, '#2a1840'),
      r(26, 6, 4, 1, '#4d23cf'),
      r(29, 7, 1, 2, '#4d23cf'),
      r(26, 9, 4, 1, '#4d23cf'),
    )
  } else if (mood === 'love') {
    ops.push(
      r(11, 13, 2, 2, '#ff4d8d'),
      r(13, 13, 2, 2, '#ff4d8d'),
      r(12, 15, 2, 1, '#ff4d8d'),
      r(18, 13, 2, 2, '#ff4d8d'),
      r(20, 13, 2, 2, '#ff4d8d'),
      r(19, 15, 2, 1, '#ff4d8d'),
    )
  } else {
    ops.push(
      r(11, 13, 3, 3, '#fff'),
      r(18, 13, 3, 3, '#fff'),
      r(12, 14, 2, 2, '#d4236a'),
      r(19, 14, 2, 2, '#d4236a'),
      r(12, 13, 1, 1, '#fff'),
      r(19, 13, 1, 1, '#fff'),
    )
  }
  ops.push(r(10, 16, 2, 1, '#ff9bb8'), r(20, 16, 2, 1, '#ff9bb8'), r(14, 17, 4, 1, '#e07090'))
  if (mood === 'happy' || mood === 'love') ops.push(r(15, 18, 2, 1, '#e07090'))
  ops.push(
    r(13, 19, 6, 3, '#ffd3c6'),
    r(7, 21, 18, 10, '#e86aaa'),
    r(8, 22, 16, 8, '#ff8ec4'),
    r(8, 22, 16, 2, '#ffb7dc'),
    r(14, 23, 4, 2, '#f06aaa'),
    r(14, 25, 1, 4, '#fff6fb'),
    r(17, 25, 1, 4, '#fff6fb'),
  )
  if (mood === 'angel' || mood === 'love') {
    ops.push(r(20, 25, 3, 3, '#ff4d8d'), r(21, 26, 1, 1, '#fff'))
  }
  return ops
}

const icons = {
  flower: [
    r(13, 13, 6, 6, '#ffd36a'),
    r(13, 4, 6, 8, '#ff5ea0'),
    r(13, 20, 6, 8, '#ff5ea0'),
    r(4, 13, 8, 6, '#ff5ea0'),
    r(20, 13, 8, 6, '#ff5ea0'),
    r(6, 6, 6, 6, '#ff8ec4'),
    r(20, 6, 6, 6, '#ff8ec4'),
    r(6, 20, 6, 6, '#ff8ec4'),
    r(20, 20, 6, 6, '#ff8ec4'),
  ],
  computer: [
    r(5, 3, 22, 17, '#3a1830'),
    r(6, 4, 20, 15, '#d8a8c0'),
    r(8, 6, 16, 11, '#3a1830'),
    r(9, 7, 14, 9, '#c8fff8'),
    r(14, 9, 4, 4, '#ffd36a'),
    r(12, 10, 2, 2, '#ff5ea0'),
    r(18, 10, 2, 2, '#ff5ea0'),
    r(14, 8, 2, 2, '#ff5ea0'),
    r(16, 8, 2, 2, '#ff5ea0'),
    r(14, 13, 4, 1, '#5cb8b4'),
    r(13, 20, 6, 3, '#b08098'),
    r(8, 23, 16, 3, '#3a1830'),
    r(9, 23, 14, 2, '#c498b0'),
    r(11, 26, 10, 2, '#8a5870'),
  ],
  folder: [
    r(3, 9, 10, 4, '#3a1830'),
    r(4, 10, 8, 3, '#ffc48a'),
    r(3, 12, 26, 16, '#3a1830'),
    r(4, 13, 24, 14, '#ffb070'),
    r(4, 13, 24, 3, '#ffd2a8'),
    r(6, 18, 8, 2, '#fff4e8'),
    r(6, 21, 12, 2, '#ffe2c4'),
  ],
  about: [
    r(6, 2, 20, 28, '#3a1830'),
    r(7, 3, 18, 26, '#fff6fb'),
    r(7, 3, 18, 5, '#ff8ec4'),
    r(11, 9, 10, 10, '#3a1830'),
    r(12, 10, 8, 8, '#ffd0b8'),
    r(13, 9, 6, 3, '#5a3048'),
    r(14, 12, 2, 2, '#3a1830'),
    r(18, 12, 2, 2, '#3a1830'),
    r(15, 15, 4, 2, '#e07090'),
    r(10, 20, 12, 7, '#ffc6e3'),
    r(12, 20, 8, 2, '#ff9ac8'),
  ],
  resume: [
    r(6, 2, 18, 28, '#3a1830'),
    r(7, 3, 16, 26, '#fffafc'),
    r(20, 3, 3, 3, '#e8d0dc'),
    r(21, 2, 3, 4, '#f3e6f2'),
    r(9, 7, 10, 2, '#ff6ba8'),
    r(9, 11, 12, 2, '#d0b0c0'),
    r(9, 15, 12, 2, '#d0b0c0'),
    r(9, 19, 8, 2, '#d0b0c0'),
    r(9, 23, 6, 4, '#ffd36a'),
    r(10, 24, 4, 2, '#ff8ec4'),
  ],
  linkedin: [
    r(3, 8, 26, 18, '#3a1830'),
    r(4, 9, 24, 16, '#ffe4f1'),
    r(4, 9, 24, 4, '#ff6ba8'),
    r(6, 15, 6, 6, '#3a1830'),
    r(7, 16, 4, 4, '#ffd0b8'),
    r(14, 15, 12, 2, '#c06090'),
    r(14, 19, 9, 2, '#d8a0b8'),
    r(12, 5, 8, 4, '#3a1830'),
    r(13, 5, 6, 3, '#d8a8c0'),
  ],
  skills: [
    r(4, 12, 24, 16, '#3a1830'),
    r(5, 13, 22, 14, '#e8a858'),
    r(5, 13, 22, 4, '#f0c878'),
    r(13, 10, 6, 5, '#3a1830'),
    r(14, 11, 4, 3, '#d89040'),
    r(8, 19, 6, 5, '#8ad8d4'),
    r(18, 19, 6, 5, '#ff8ec4'),
    r(23, 4, 2, 6, '#ffd36a'),
    r(21, 6, 6, 2, '#ffd36a'),
  ],
  projects: [
    r(10, 4, 12, 10, '#3a1830'),
    r(11, 5, 10, 8, '#8ad8d4'),
    r(11, 5, 10, 2, '#c8fff8'),
    r(4, 14, 12, 12, '#3a1830'),
    r(5, 15, 10, 10, '#ff8ec4'),
    r(5, 15, 10, 2, '#ffc6e3'),
    r(16, 16, 12, 12, '#3a1830'),
    r(17, 17, 10, 10, '#ffd36a'),
    r(17, 17, 10, 2, '#ffe9a8'),
  ],
  recycle: [
    r(8, 5, 16, 3, '#3a1830'),
    r(9, 6, 14, 1, '#d0c0c8'),
    r(6, 8, 20, 20, '#3a1830'),
    r(7, 9, 18, 18, '#e8d0dc'),
    r(9, 11, 2, 14, '#c0a0b0'),
    r(13, 11, 2, 14, '#c0a0b0'),
    r(17, 11, 2, 14, '#c0a0b0'),
    r(21, 11, 2, 14, '#c0a0b0'),
    r(9, 17, 14, 2, '#d8b8c8'),
    r(14, 13, 4, 4, '#ff8ec4'),
  ],
  help: [
    r(6, 4, 20, 24, '#3a1830'),
    r(7, 5, 18, 22, '#ffe4f1'),
    r(13, 9, 6, 6, '#ffd36a'),
    r(11, 10, 4, 4, '#ff5ea0'),
    r(17, 10, 4, 4, '#ff5ea0'),
    r(13, 7, 6, 4, '#ff5ea0'),
    r(13, 13, 6, 4, '#ff5ea0'),
    r(12, 20, 8, 3, '#c090a8'),
  ],
  mail: [
    r(3, 8, 26, 18, '#3a1830'),
    r(4, 9, 24, 16, '#fff6fb'),
    r(4, 9, 24, 3, '#ff8ec4'),
    poly([[4, 9], [16, 18], [28, 9]], '#3a1830'),
    poly([[5, 9], [16, 17], [27, 9]], '#ffc6e3'),
  ],
  desktop: [
    r(4, 4, 24, 20, '#3a1830'),
    r(5, 5, 22, 18, '#f3e6f2'),
    r(7, 7, 6, 6, '#ff8ec4'),
    r(15, 8, 8, 6, '#8ad8d4'),
    r(4, 24, 24, 4, '#ee8ab4'),
  ],
  calendar: [
    r(5, 6, 22, 22, '#4d23cf'),
    r(6, 7, 20, 20, '#90f4e4'),
    r(6, 7, 20, 5, '#eaa0e8'),
    r(9, 5, 3, 5, '#4d23cf'),
    r(20, 5, 3, 5, '#4d23cf'),
    r(9, 16, 3, 3, '#4d23cf'),
    r(14, 16, 3, 3, '#4d23cf'),
    r(19, 16, 3, 3, '#ff7ad4'),
    r(9, 21, 3, 3, '#4d23cf'),
    r(14, 21, 3, 3, '#4d23cf'),
  ],
  notes: [
    r(7, 3, 18, 26, '#4d23cf'),
    r(8, 4, 16, 24, '#fffafc'),
    r(10, 7, 8, 2, '#4d23cf'),
    r(20, 6, 2, 2, '#eaa0e8'),
    r(10, 12, 12, 2, '#c8b4f0'),
    r(10, 16, 12, 2, '#c8b4f0'),
    r(10, 20, 8, 2, '#c8b4f0'),
  ],
  ame: ame('smile'),
  'ame-happy': ame('happy'),
  'ame-wink': ame('wink'),
  'ame-angel': ame('angel'),
  'ame-sleepy': ame('sleepy'),
  'ame-love': ame('love'),
  'sticker-heart': [
    r(8, 10, 6, 6, '#ff6eb4'),
    r(18, 10, 6, 6, '#ff6eb4'),
    r(10, 14, 12, 8, '#ff6eb4'),
    r(12, 20, 8, 3, '#ff6eb4'),
    r(14, 22, 4, 3, '#ff6eb4'),
    r(10, 12, 2, 2, '#fff'),
  ],
  'sticker-star': [
    r(14, 4, 4, 24, '#ffd36a'),
    r(6, 12, 20, 4, '#ffd36a'),
    r(8, 8, 4, 4, '#ffd36a'),
    r(20, 8, 4, 4, '#ffd36a'),
    r(8, 20, 4, 4, '#ffd36a'),
    r(20, 20, 4, 4, '#ffd36a'),
  ],
  'sticker-sparkle': [
    r(14, 6, 4, 20, '#7a5cff'),
    r(8, 14, 16, 4, '#7a5cff'),
    r(6, 8, 3, 3, '#90f4e4'),
    r(23, 20, 3, 3, '#ff7ad4'),
  ],
  'sticker-plus': [
    r(13, 6, 6, 20, '#4d23cf'),
    r(6, 13, 20, 6, '#4d23cf'),
    r(14, 7, 4, 18, '#90f4e4'),
    r(7, 14, 18, 4, '#90f4e4'),
  ],
  remind: [
    r(6, 3, 20, 26, '#3a1830'),
    r(7, 4, 18, 24, '#fff6fb'),
    r(7, 4, 18, 5, '#ff6ba8'),
    r(14, 12, 4, 8, '#4d23cf'),
    r(14, 22, 4, 3, '#4d23cf'),
    r(15, 13, 2, 5, '#ffd36a'),
  ],
  sun: [
    r(11, 11, 10, 10, '#ffd36a'),
    r(13, 13, 6, 6, '#ffe9a0'),
    r(15, 4, 2, 5, '#ffb347'),
    r(15, 23, 2, 5, '#ffb347'),
    r(4, 15, 5, 2, '#ffb347'),
    r(23, 15, 5, 2, '#ffb347'),
  ],
  fallback: [r(8, 8, 16, 16, '#eaa0e8')],
}

function writeIcon(name, ops, { size = 32, background = null, file = join(iconDir, `${name}.png`) } = {}) {
  const surface = canvas(size, size)
  if (background) surface.fill(parseHex(background))
  draw(surface, ops)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, encodePng(size, size, surface.data))
}

mkdirSync(iconDir, { recursive: true })
for (const [name, ops] of Object.entries(icons)) writeIcon(name, ops)

writeIcon('favicon', [
  r(11, 3, 12, 2, '#241c52'),
  r(8, 5, 16, 3, '#241c52'),
  r(7, 7, 18, 8, '#2a2468'),
  r(6, 11, 4, 7, '#241c52'),
  r(22, 11, 4, 7, '#241c52'),
  r(10, 8, 12, 11, '#ffd3c6'),
  r(10, 7, 12, 3, '#2a2468'),
  r(16, 7, 3, 5, '#ff7eb6'),
  r(11, 12, 3, 3, '#fff'),
  r(18, 12, 3, 3, '#fff'),
  r(12, 13, 2, 2, '#d4236a'),
  r(19, 13, 2, 2, '#d4236a'),
  r(14, 16, 4, 1, '#e07090'),
  r(8, 19, 16, 10, '#ff8ec4'),
  r(14, 21, 1, 4, '#fff6fb'),
  r(17, 21, 1, 4, '#fff6fb'),
], {
  background: '#ffe4f1',
  file: join(root, 'public', 'favicon.png'),
})

const plusColor = [...parseHex('#6ed4d0').slice(0, 3), Math.round(0.55 * 255)]
const plus = canvas(14, 14)
plus.fill(parseHex('#f3e4f4'))
plus.rect(6, 2, 2, 10, plusColor)
plus.rect(2, 6, 4, 2, plusColor)
plus.rect(8, 6, 4, 2, plusColor)
writeFileSync(join(root, 'src', 'wallpaper-plus.png'), encodePng(14, 14, plus.data))

const hatchColor = [...parseHex('#5cb8b4').slice(0, 3), Math.round(0.42 * 255)]
const hatch = canvas(12, 12)
hatch.fill(parseHex('#f3e6f2'))
hatch.rect(5, 2, 2, 8, hatchColor)
hatch.rect(2, 5, 3, 2, hatchColor)
hatch.rect(7, 5, 3, 2, hatchColor)
writeFileSync(join(root, 'public', 'wallpaper.png'), encodePng(12, 12, hatch.data))

console.log(`wrote ${Object.keys(icons).length} icons`)
