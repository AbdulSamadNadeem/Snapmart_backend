export function dmsToDecimal(dms) {
  const regex = /(\d+)°(\d+)'([\d.]+)"?([NSEW])/
  const parts = dms?.match(regex)

  if (!parts) return null

  const degrees = parseFloat(parts[1])
  const minutes = parseFloat(parts[2])
  const seconds = parseFloat(parts[3])
  const direction = parts[4]

  let decimal = degrees + minutes / 60 + seconds / 3600
  if (direction === 'S' || direction === 'W') {
    decimal *= -1
  }

  return decimal
}
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
      )
    } else {
      reject(new Error('Geolocation is not supported by this browser.'))
    }
  })
}
