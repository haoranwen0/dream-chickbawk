import * as React from 'react'
import { getDatabase, ref, get } from 'firebase/database'
// prettier-ignore
import { Stack, Typography, Tooltip, Box } from '@mui/material'
import { getInitials } from '../utils/utils'
import CustomDialog from './CustomDialog'

const Attendees = () => {
  const [attendees, setAttendees] = React.useState([])
  const [showAttendeesDialog, setShowAttendeesDialog] = React.useState(false)

  const cutoff = 8

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
        // console.log(names)
        setAttendees(names)
      } else {
        console.log('No data available')
      }
    } catch (error) {
      console.log('Error getting attendees:', error)

      throw error
    }
  }

  const tempAttendees = Array(100).fill(attendees[0])

  return (
    <Box width='100%' height='fit-content'>
      <Typography
        textAlign='left'
        variant='subtitle1'
        color='chickbawk.light'
        fontWeight='800'
        fontSize='1.5rem'
        mb='0.5rem'
      >
        Who's coming?
      </Typography>
      <Stack
        width='100%'
        flexDirection='row'
        flexWrap='wrap'
        alignItems='center'
        sx={{ cursor: 'default' }}
      >
        {attendees.length > 0 &&
          attendees.slice(0, cutoff).map((attendee, index) => {
            return (
              <Stack
                justifyContent='center'
                alignItems='center'
                width={8}
                height={8}
                p={2}
                borderRadius={8}
                border='1px solid'
                borderColor='chickbawk.secondary'
                bgcolor='chickbawk.accent'
                boxShadow='0px 0px 20px #FA971270'
                zIndex={`${index}`}
                key={index}
                ml={index !== 0 ? '-0.75rem' : '0rem'}
              >
                <Tooltip title={attendee}>
                  <Typography
                    variant='body1'
                    color='chickbawk.light'
                    fontSize='0.875rem'
                    fontWeight='600'
                  >
                    {getInitials(attendee)}
                  </Typography>
                </Tooltip>
              </Stack>
            )
          })}
        {attendees.length >= cutoff && (
          <Box onClick={() => setShowAttendeesDialog(true)}>
            <Typography
              variant='body1'
              fontWeight='bold'
              ml='0.5rem'
              color='chickbawk.accent'
              sx={{
                '&:hover': {
                  textDecoration: 'underline'
                },
                cursor: 'pointer'
              }}
            >
              + {attendees.length - cutoff} More
            </Typography>
          </Box>
        )}
      </Stack>
      <CustomDialog
        onClose={() => setShowAttendeesDialog(false)}
        open={showAttendeesDialog}
        maxHeight='400px'
        dialogTitle='Attendees'
      >
        <Stack flexDirection='row' flexWrap='wrap' gap={1}>
          {attendees.map((attendee, index) => {
            return (
              <Box
                width={{
                  xs: 'calc((100% - 0.5rem) / 2)',
                  md: 'calc((100% - (2 * 0.5rem)) / 3)'
                }}
                key={index}
              >
                <Typography
                  noWrap
                  color='chickbawk.accent'
                  p='1rem'
                  borderRadius='0.75rem'
                  bgcolor='chickbawk.light'
                  textAlign='center'
                  fontWeight='600'
                  textTransform='uppercase'
                  fontSize='0.875rem'
                >
                  {attendee}
                </Typography>
              </Box>
            )
          })}
        </Stack>
      </CustomDialog>
    </Box>
  )
}

export default Attendees
