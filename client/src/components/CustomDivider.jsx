import React from 'react'

import { Box, Stack } from '@mui/material'
import { orange } from '@mui/material/colors'

const CustomDivider = () => {
  return (
    <Stack justifyContent='center' spacing={1.5}>
      <Box
        width='0.5rem'
        height='0.5rem'
        bgcolor={orange[400]}
        borderRadius='100%'
      />
      <Box
        width='0.5rem'
        height='0.5rem'
        bgcolor={orange[400]}
        borderRadius='100%'
      />
    </Stack>
  )
}

export default CustomDivider
