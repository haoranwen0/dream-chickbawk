export const calculateTimeLeft = () => {
  const difference = +new Date('2024-05-25T14:30:00-04:00') - +new Date()
  let timeLeft = {}

  const addLeadingZero = (num) => (num < 10 ? `0${num}` : num.toString())

  if (difference > 0) {
    timeLeft = {
      days: addLeadingZero(Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: addLeadingZero(Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: addLeadingZero(Math.floor((difference / 1000 / 60) % 60)),
      seconds: addLeadingZero(Math.floor((difference / 1000) % 60))
    }
  }

  return timeLeft
}

export const getInitials = (name) => {
  return name
    .split(' ') // Split the name by spaces
    .map((word) => word[0].toUpperCase()) // Take the first letter and capitalize it
    .join('') // Join the initials together
}

export const getRandomElement = (arr) => {
  if (arr.length === 0) {
    return undefined // Handle empty array case
  }
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}
