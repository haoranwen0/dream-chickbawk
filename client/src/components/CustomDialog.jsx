import React from 'react'
import { Dialog, DialogTitle, Divider, Stack } from '@mui/material'
import theme from '../theme'
import { responsiveContainerWidth } from '../utils/muiCustomStyles'

const CustomDialog = (props) => {
  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      sx={{
        '& .MuiDialog-paper': {
          border: '1px solid #000000',
          borderRadius: '0.5rem', // Customize the border radius here
          width: responsiveContainerWidth,
          ...(props.maxHeight && { maxHeight: props.maxHeight })
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
          {props.dialogTitle}
        </DialogTitle>
        <Divider />
        {props.children}
      </Stack>
    </Dialog>
  )
}

export default CustomDialog
