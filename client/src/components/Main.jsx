import * as React from 'react'
import { calculateTimeLeft } from '../utils/utils'
import { Button, Stack, Alert } from '@mui/material'
import { Helmet } from 'react-helmet'
// prettier-ignore
import { CountdownTime, RSVPForm, ChickbawkGraphics, Attendees, Referral, Alerts } from '../components'
import { buttonStyle, responsiveContainerWidth } from '../utils/muiCustomStyles'
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
      <Helmet>
        <title>Hao's Dream Chickbawk!</title>
        <link
          rel='icon'
          type='image/svg+xml'
          href='../assets/icon/chickbawk-favicon.svg'
        />
      </Helmet>
      <Alerts />
      <Stack alignItems='center' spacing={2} width={responsiveContainerWidth}>
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
