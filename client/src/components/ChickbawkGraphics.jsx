import * as React from 'react'

import { Box } from '@mui/material'
import chickbawkGraphics from '../utils/chickbawkGraphics'
import { getRandomElement } from '../utils/utils'
import chickbawkSounds from '../utils/chickbawkSounds'

const ChickbawkGraphics = (props) => {
  const [chickbawkRandomSound, setChickbawkRandomSound] = React.useState(null)

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile)
    audio.play()
  }

  const getRandomSound = () => {
    const randomChickbawkSound = getRandomElement(chickbawkSounds)

    playSound(randomChickbawkSound.sound)
    setChickbawkRandomSound(randomChickbawkSound)

    setTimeout(() => {
      setChickbawkRandomSound(null)
    }, 2000)
  }

  return (
    <Box position='relative'>
      {chickbawkGraphics(props.state).map((chickbawkGraphic, index) => {
        return (
          <Box
            key={index}
            component='img'
            width={chickbawkGraphic.width}
            src={chickbawkGraphic.src}
            bottom={chickbawkGraphic.bottom}
            top={chickbawkGraphic.top}
            right={chickbawkGraphic.right}
            left={chickbawkGraphic.left}
            position={chickbawkGraphic.position}
            sx={chickbawkGraphic.sx}
            onClick={
              chickbawkGraphic.name === 'chickbawk' ? getRandomSound : undefined
            }
          />
        )
      })}

      {chickbawkRandomSound !== null && (
        <Box
          component='img'
          width='45%'
          src={chickbawkRandomSound.src}
          top='20%'
          right='0%'
          position='absolute'
          sx={{
            transform: 'rotate(-15deg)'
          }}
        />
      )}
    </Box>
  )
}

export default ChickbawkGraphics
