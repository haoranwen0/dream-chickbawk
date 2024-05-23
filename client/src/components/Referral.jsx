import * as React from 'react'

import { Typography, Stack, Dialog, DialogTitle, Divider } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import theme from '../theme'

const Referral = (props) => {
  const referralLinkRef = React.useRef(null)

  const [copiedReferralLink, setCopiedReferralLink] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(props.openDialog)
  const referralLink = `https://dream-chickbawk.web.app/referral?referrer=${props.userId}`

  React.useEffect(() => {
    setDialogOpen(props.openDialog)
  }, [props.openDialog])

  const copyToClipboard = () => {
    setCopiedReferralLink(true)

    navigator.clipboard.writeText(referralLink)

    if (referralLinkRef.current) {
      const range = document.createRange()
      range.selectNodeContents(referralLinkRef.current)
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
    }

    setTimeout(() => {
      setCopiedReferralLink(false)
    }, 1500)
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  return (
    <Dialog
      onClose={handleClose}
      open={dialogOpen}
      sx={{
        '& .MuiDialog-paper': {
          border: '1px solid #000000',
          borderRadius: '0.5rem', // Customize the border radius here
          width: { xl: '40%', lg: '55%', md: '70%', sm: '85%', xs: '80%' }
        }
      }}
    >
      <Stack
        p='1rem'
        spacing={2}
        bgcolor='chickbawk.light'
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
          Referral Program!
        </DialogTitle>
        <Divider />
        <Typography color='chickbawk.accent'>
          Refer people to get{' '}
          <Typography fontWeight='800' as='span'>
            10% off
          </Typography>{' '}
          because the event is not free because Hao is broke. BUTTT refer enough
          and you'll get a free meal!
        </Typography>
        <Stack
          p='0.5rem'
          width='100%'
          borderRadius='0.25rem'
          bgcolor='chickbawk.light'
          border='1px solid'
          borderColor='#dddddd'
          position='relative'
          pr='2rem'
          onClick={copyToClipboard}
          sx={{ cursor: 'pointer' }}
        >
          <Typography
            as='span'
            variant='body1'
            color='chickbawk.accent'
            ref={referralLinkRef}
            tabIndex={0}
            fontStyle='italic'
          >
            {referralLink}
          </Typography>
          <Stack
            justifyContent='center'
            alignItems='center'
            position='absolute'
            right='0.5rem'
            top='50%'
            sx={{ transform: 'translate(0, -50%)' }}
          >
            {copiedReferralLink ? (
              <CheckIcon
                sx={{
                  cursor: 'pointer',
                  color: 'chickbawk.accent',
                  fontSize: '1.25rem'
                }}
              />
            ) : (
              <ContentCopyIcon
                sx={{
                  cursor: 'pointer',
                  color: 'chickbawk.accent',
                  fontSize: '1.25rem'
                }}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default Referral
