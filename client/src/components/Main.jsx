import * as React from 'react'
import { calculateTimeLeft } from '../utils/utils'
import { Button, Stack, Alert } from '@mui/material'
// prettier-ignore
import { CountdownTime, RSVPForm, ChickbawkGraphics, Attendees, Referral } from '../components'
import { buttonStyle } from '../utils/muiCustomStyles'
import theme from '../theme'

function Main() {
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft())
  const [showRSVPForm, setShowRSVPForm] = React.useState(false)
  const [state, setState] = React.useState('not-filled')
  const [userId, setUserId] = React.useState(null)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  return (
    <Stack
      alignItems='center'
      minHeight='100svh'
      width='100%'
      p={4}
      sx={{
        background: `linear-gradient(to bottom, ${theme.palette.chickbawk.secondary}, ${theme.palette.chickbawk.primary})`
      }}
      gap={4}
    >
      <Alert variant='filled' severity='warning' sx={{ width: '100%' }}>
        RSVP By Friday 5/24 11:59 PM! Text 347-543-6365 for any issues!
      </Alert>
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
        {state === 'not-filled' ? (
          <React.Fragment>
            {!showRSVPForm ? (
              <React.Fragment>
                <Button
                  variant='contained'
                  fullWidth
                  size='large'
                  onClick={() => setShowRSVPForm(true)}
                  sx={buttonStyle}
                >
                  RSVP!
                </Button>
              </React.Fragment>
            ) : (
              <RSVPForm
                setShowRSVPForm={setShowRSVPForm}
                setState={setState}
                setUserId={setUserId}
              />
            )}
          </React.Fragment>
        ) : state === 'rsvped' ? (
          <></>
        ) : (
          <></>
        )}
        <Referral userId={userId} openDialog={state === 'rsvped'} />
        <Attendees />
      </Stack>
    </Stack>
  )
}

export default Main
