import React from 'react'

import { Box, Grid, Stack, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'

const CountdownTime = (props) => {
  return (
    <Stack alignItems='center' flex='1'>
      <Stack
        bgcolor={'chickbawk.secondary'}
        borderRadius={4}
        width='100%'
        sx={{
          aspectRatio: '1/1',
          boxShadow: '0px 0px 20px #FD551B70'
        }}
        justifyContent='center'
        alignItems='center'
        mb={2}
      >
        <Typography
          variant='h1'
          color='chickbawk.light'
          fontWeight='bold'
          fontSize={{
            xl: '6rem',
            lg: '4.5rem',
            md: '4rem',
            sm: '3.5rem',
            xs: '2.75rem'
          }}
        >
          {props.countdownTime}
        </Typography>
      </Stack>
      <Typography
        variant='h4'
        fontSize='1rem'
        fontWeight='700'
        color='chickbawk.accent'
      >
        {props.type}
      </Typography>
    </Stack>
  )
}

export default CountdownTime
