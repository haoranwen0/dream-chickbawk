import * as React from 'react'

import { calculateTimeLeft } from './utils/calculateTimeLeft'
// prettier-ignore
import { Button, Box, Stack } from '@mui/material'

import { CountdownTime, RSVPForm } from './components'
import Chickbawk from './assets/chickbawk-graphic.svg'
import ChickbawkThanks from './assets/chickbawk-graphic-thanks.svg'
import theme from './theme'

function App() {
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft())
  const [showRSVPForm, setShowRSVPForm] = React.useState(false)
  const [rsvped, setRsvped] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
      width='100%'
      p={4}
      // py={12}
      sx={{
        background: `linear-gradient(to bottom, ${theme.palette.chickbawk.secondary}, ${theme.palette.chickbawk.primary})`
      }}
    >
      <Stack
        alignItems='center'
        spacing={2}
        sx={{ width: { xl: '30%', xs: '100%' } }}
      >
        <Stack
          direction='row'
          spacing={2}
          width='100%'
          justifyContent='space-around'
        >
          <CountdownTime countdownTime={timeLeft.days} type='Days' />
          <CountdownTime countdownTime={timeLeft.hours} type='Hours' />
          <CountdownTime countdownTime={timeLeft.minutes} type='Minutes' />
          <CountdownTime countdownTime={timeLeft.seconds} type='Seconds' />
        </Stack>
        <Box
          component='img'
          width='100%'
          src={rsvped ? ChickbawkThanks : Chickbawk}
        />
        {!rsvped && (
          <>
            {!showRSVPForm ? (
              <Button
                variant='contained'
                fullWidth
                size='large'
                onClick={() => setShowRSVPForm(true)}
                sx={{
                  backgroundColor: 'chickbawk.secondary',
                  color: 'chickbawk.light',
                  '&:hover': {
                    backgroundColor: 'chickbawk.light',
                    color: 'chickbawk.secondary'
                  },
                  fontWeight: '900',
                  boxShadow: '0px 0px 20px #FA971270'
                }}
              >
                RSVP!
              </Button>
            ) : (
              <RSVPForm
                setShowRSVPForm={setShowRSVPForm}
                setRsvped={setRsvped}
              />
            )}
          </>
        )}
      </Stack>
    </Stack>
  )
}

export default App
