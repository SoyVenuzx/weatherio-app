import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const weekDayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDayName = (dateUnix: number, timezone: number) => {
  const date = new Date((dateUnix + timezone) * 1000)
  return weekDayNames[date.getUTCDay()]
}

export const getFormattedDate = (dateUnix: number, timezone: number) => {
  const date = new Date((dateUnix + timezone) * 1000)
  return {
    dayName: weekDayNames[date.getUTCDay()],
    month: monthNames[date.getUTCMonth()],
    day: date.getUTCDate()
  }
}

export const getTime = (timeUnix: number, timezone: number) => {
  const date = new Date((timeUnix + timezone) * 1000)
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  const period = date.getUTCHours() >= 12 ? 'PM' : 'AM'
  return `${hours}:${minutes} ${period}`
}

export const hourlyGetTime = (timeUnix: number, timezone: number) => {
  const date = new Date((timeUnix + timezone) * 1000)
  let hours = date.getUTCHours()
  const period = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  return `${hours} ${period}`
}

export const mps_to_kmh = (mps: number) => (mps * 3600) / 1000

export const aqiText = {
  1: {
    level: 'Good',
    message:
      'Air quality is considered satisfactory, and air pollution poses little or no risk'
  },
  2: {
    level: 'Fair',
    message: ''
  },
  3: {
    level: 'Moderate',
    message: ''
  },
  4: {
    level: 'Poor',
    message: ''
  },
  5: {
    level: 'Very poor',
    message: ''
  }
}

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))
