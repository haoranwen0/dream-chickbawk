import * as React from 'react'

import { calculateTimeLeft } from './utils/calculateTimeLeft'

function App() {
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft())

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  return <>Hello World</>
}

export default App
