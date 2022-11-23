export function convertToWeekday(day) {
  let date = new Date(day.dt * 1000).toDateString().slice(0, 3)
  return date
}

export function getCurrentWeekday() {
  let date = new Date().toLocaleString('en-US', {
    weekday: 'long',
  })
  return date
}

export function getCurrentDate() {
  let date = new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })
  return date
}
