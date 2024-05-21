import * as React from 'react'

import { Box } from '@mui/material'
import chickbawkGraphics from '../utils/chickbawkGraphics'

const ChickbawkGraphics = (props) => {
  return (
    <Box position='relative'>
      {chickbawkGraphics(props.state).map((chickbawkGraphic, index) => {
        return (
          <Box
            component='img'
            width={chickbawkGraphic.width}
            src={chickbawkGraphic.src}
            bottom={chickbawkGraphic.bottom}
            top={chickbawkGraphic.top}
            right={chickbawkGraphic.right}
            left={chickbawkGraphic.left}
            position={chickbawkGraphic.position}
            sx={chickbawkGraphic.sx}
          />
        )
      })}
    </Box>
  )
}

export default ChickbawkGraphics
