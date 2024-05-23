import * as React from 'react'
import { getDatabase, ref, get } from 'firebase/database'
// prettier-ignore
import { Stack, Typography, Tooltip, Box, Dialog, DialogTitle, Divider } from '@mui/material'
import { getInitials } from '../utils/utils'
import theme from '../theme'

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
      <Dialog
        onClose={() => setShowAttendeesDialog(false)}
        open={showAttendeesDialog}
        sx={{
          '& .MuiDialog-paper': {
            border: '1px solid #000000',
            borderRadius: '0.5rem', // Customize the border radius here
            width: { xl: '40%', lg: '55%', md: '70%', sm: '85%', xs: '80%' },
            maxHeight: '400px'
          }
        }}
      >
        <Stack
          p='1rem'
          spacing={2}
          bgcolor='chickbawk.secondary'
          width='100%'
          sx={{
            background: `linear-gradient(to bottom, ${theme.palette.chickbawk.secondary}, ${theme.palette.chickbawk.primary})`
          }}
        >
          <DialogTitle
            color='chickbawk.accent'
            fontWeight='900'
            fontSize={{
              xl: '3rem',
              lg: '2.75rem',
              md: '2.5rem',
              sm: '2.25rem',
              xs: '2rem'
            }}
            sx={{
              '&.MuiDialogTitle-root': {
                padding: '0rem'
              }
            }}
          >
            Attendees
          </DialogTitle>
          <Divider />
          <Stack flexDirection='row' flexWrap='wrap' gap={1}>
            {attendees.map((attendee, index) => {
              return (
                <Box width={{ xs: 'calc((100% - 0.5rem) / 2)' }} key={index}>
                  <Typography
                    color='chickbawk.accent'
                    p='0.5rem'
                    borderRadius='0.75rem'
                    // border='1px solid'
                    // borderColor='#dddddd'
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
        </Stack>
      </Dialog>
    </Box>
  )
}

export default Attendees
