export const calculateTimeLeft = () => {
  const difference = +new Date('2024-05-24T12:00:00-04:00') - +new Date()
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
