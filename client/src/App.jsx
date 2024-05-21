import * as React from 'react'
import { calculateTimeLeft } from './utils/calculateTimeLeft'
import { getDatabase, ref, get, child } from 'firebase/database'
import { Button, Box, Stack, Typography } from '@mui/material'
import { CountdownTime, RSVPForm } from './components'
import ChickbawkGraphics from './components/ChickbawkGraphics'
import theme from './theme'

const customButtonStyles = {
  backgroundColor: 'chickbawk.secondary',
  color: 'chickbawk.light',
  '&:hover': {
    backgroundColor: 'chickbawk.light',
    color: 'chickbawk.secondary'
  },
  fontWeight: '900',
  boxShadow: '0px 0px 20px #FA971270'
}

function App() {
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft())
  const [showRSVPForm, setShowRSVPForm] = React.useState(false)
  const [state, setState] = React.useState('not-filled')
  const [attendees, setAttendees] = React.useState([])
  const [showAttendees, setShowAttendees] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  React.useEffect(() => {
    getAttendees()
  }, [])

  const getAttendees = async () => {
    const db = getDatabase()

    try {
      const snapshot = await get(ref(db, 'rsvp-forms'))

      if (snapshot.exists()) {
        const rsvpData = snapshot.val()
        const names = Object.values(rsvpData).map((entry) => entry.name)
        console.log(names)
        setAttendees(names)
      } else {
        console.log('No data available')
      }
    } catch (error) {
      console.log('Error getting attendees:', error)

      throw error
    }
  }

  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      minHeight='100svh'
      width='100%'
      p={4}
      sx={{
        background: `linear-gradient(to bottom, ${theme.palette.chickbawk.secondary}, ${theme.palette.chickbawk.primary})`
      }}
    >
      <Stack
        alignItems='center'
        spacing={2}
        sx={{
          width: { xl: '40%', lg: '55%', md: '70%', sm: '85%', xs: '100%' }
        }}
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
        <ChickbawkGraphics state={state} />
        {state === 'not-filled' && (
          <React.Fragment>
            {!showRSVPForm ? (
              <React.Fragment>
                <Button
                  variant='contained'
                  fullWidth
                  size='large'
                  onClick={() => setShowRSVPForm(true)}
                  sx={customButtonStyles}
                >
                  RSVP!
                </Button>
                {!showAttendees ? (
                  <Button
                    variant='contained'
                    fullWidth
                    size='large'
                    onClick={() => setShowAttendees(true)}
                    sx={customButtonStyles}
                  >
                    Who's coming?
                  </Button>
                ) : (
                  <Stack
                    width='100%'
                    height='fit-content'
                    flexDirection='row'
                    flexWrap='wrap'
                    gap={2}
                    justifyContent='flex-start'
                  >
                    {attendees.map((attendee, index) => {
                      return (
                        <Typography key={index} color='white' fontWeight='600'>
                          {attendee}
                        </Typography>
                      )
                    })}
                  </Stack>
                )}
              </React.Fragment>
            ) : (
              <RSVPForm setShowRSVPForm={setShowRSVPForm} setState={setState} />
            )}
          </React.Fragment>
        )}
      </Stack>
    </Stack>
  )
}

export default App
