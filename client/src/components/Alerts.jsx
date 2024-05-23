import React from 'react'

// prettier-ignore
import { Alert, Button, Stack, Typography } from '@mui/material'
import { getDatabase, ref, get } from 'firebase/database'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import SportsScoreIcon from '@mui/icons-material/SportsScore'
import { responsiveContainerWidth } from '../utils/muiCustomStyles'
import { CustomDialog } from './index'

const Alerts = () => {
  const [leaderboard, setLeaderboard] = React.useState([])
  const [showLeaderboard, setShowLeaderboard] = React.useState(false)

  const getNameWithHighestReferralCount = async () => {
    const db = getDatabase()
    const referrals = []

    try {
      const snapshot = await get(ref(db, 'rsvp-forms'))
      if (snapshot.exists()) {
        const rsvpData = snapshot.val()
        let maxReferralCount = -1
        let nameWithMaxReferrals = ''

        Object.values(rsvpData).forEach((form) => {
          referrals.push({
            name: form.name,
            referral_count: form.referral_count ? form.referral_count : 0
          })

          if (form.referral_count && form.referral_count > maxReferralCount) {
            maxReferralCount = form.referral_count
            nameWithMaxReferrals = form.name
          }
        })

        referrals.sort(function (first, second) {
          return second.referral_count - first.referral_count
        })

        setLeaderboard(referrals)
      } else {
        console.log('No RSVP data available')
        return null
      }
    } catch (error) {
      console.log('Error fetching RSVP data:', error)
      throw error
    }
  }

  React.useEffect(() => {
    getNameWithHighestReferralCount()
  }, [])

  return (
    <React.Fragment>
      <Stack gap={1} width={responsiveContainerWidth}>
        {leaderboard.length > 0 && (
          <Alert
            icon={<SportsScoreIcon fontSize='inherit' />}
            variant='filled'
            severity='warning'
            action={
              <Button
                color='inherit'
                size='small'
                onClick={() => setShowLeaderboard(true)}
              >
                Leaderboard
              </Button>
            }
          >
            {leaderboard[0].name} has the highest referral count with{' '}
            {leaderboard[0].referral_count} referrals!
          </Alert>
        )}
        <Alert
          icon={<PriorityHighIcon fontSize='inherit' />}
          variant='filled'
          severity='warning'
          sx={{ width: '100%' }}
        >
          RSVP By Friday 5/24 11:59 PM! Text 347-543-6365 for any issues!
        </Alert>
      </Stack>

      <CustomDialog
        onClose={() => setShowLeaderboard(false)}
        open={showLeaderboard}
        dialogTitle='Referral Leaderboard'
        maxHeight='400px'
      >
        <Stack gap={1}>
          {leaderboard.map((referral, index) => {
            return (
              <Stack
                flexDirection='row'
                justifyContent='space-between'
                key={index}
                bgcolor='chickbawk.light'
                p='1rem'
                borderRadius='0.75rem'
              >
                <Typography
                  variant='body1'
                  textTransform='uppercase'
                  color='chickbawk.accent'
                  fontSize='0.875rem'
                  fontWeight='600'
                >
                  {referral.name}
                </Typography>
                <Typography
                  variant='body1'
                  textTransform='uppercase'
                  color='chickbawk.accent'
                  fontSize='0.875rem'
                  fontWeight='600'
                >
                  {referral.referral_count}
                </Typography>
              </Stack>
            )
          })}
        </Stack>
      </CustomDialog>
    </React.Fragment>
  )
}

export default Alerts
