import ChickbawkInfo from '../assets/chickbawk-info.svg'
import ChickbawkBeer from '../assets/chickbawk-beer.svg'
import ChickbawkChicken from '../assets/chickbawk-chicken.svg'
import Chickbawk from '../assets/chickbawk-graphic.svg'
import ChickbawkMessageThanks from '../assets/chickbawk-message-thanks.svg'
import ChickbawkMessageAlreadyRSVPed from '../assets/chickbawk-message-already-rsvped.svg'

const chickbawkGraphics = (messageState) => {
  const initialChickbawkGraphics = [
    {
      src: Chickbawk,
      width: '100%'
    },
    {
      src: ChickbawkInfo,
      position: 'absolute',
      bottom: '-15%',
      right: '50%',
      sx: { transform: 'translate(50%, 0)' },
      width: '50%'
    },
    {
      src: ChickbawkBeer,
      position: 'absolute',
      bottom: '0%',
      right: '0%',
      sx: { transform: 'rotate(-11deg)' },
      width: '25%'
    },
    {
      src: ChickbawkChicken,
      position: 'absolute',
      top: '8%',
      left: '4%',
      sx: { transform: 'rotate(46deg)' },
      width: '25%'
    }
  ]

  const chickbawkMessage = {
    position: 'absolute',
    top: '5%',
    left: '52.5%',
    width: '35%'
  }

  switch (messageState) {
    case 'rsvped':
      chickbawkMessage.src = ChickbawkMessageThanks
      break
    case 'already-rsvped':
      chickbawkMessage.src = ChickbawkMessageAlreadyRSVPed
      break
    default:
      break
  }

  initialChickbawkGraphics.push(chickbawkMessage)

  return initialChickbawkGraphics
}

export default chickbawkGraphics
