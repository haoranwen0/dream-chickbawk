import ChickbawkInfo from '../assets/chickbawk-info.svg'
import ChickbawkBeer from '../assets/chickbawk-beer.svg'
import ChickbawkChicken from '../assets/chickbawk-chicken.svg'
import ChickbawkFrom from '../assets/chickbawk-from.svg'
import ChickbawkWhat from '../assets/chickbawk-what.svg'
import Chickbawk from '../assets/chickbawk-graphic.svg'
import ChickbawkMessageThanks from '../assets/chickbawk-message-thanks.svg'
import ChickbawkMessageAlreadyRSVPed from '../assets/chickbawk-message-already-rsvped.svg'

const chickbawkGraphics = (messageState) => {
  const initialChickbawkGraphics = [
    {
      name: 'chickbawk',
      src: Chickbawk,
      width: '100%',
      sx: { cursor: 'pointer' }
    },
    {
      name: 'info',
      src: ChickbawkInfo,
      position: 'absolute',
      bottom: '-15%',
      right: '50%',
      sx: { transform: 'translate(50%, 0)' },
      width: '50%'
    },
    {
      name: 'what',
      src: ChickbawkWhat,
      position: 'absolute',
      top: '-15%',
      left: '50%',
      sx: { transform: 'translate(-50%, 0)' },
      width: '45%'
    },
    {
      name: 'beer',
      src: ChickbawkBeer,
      position: 'absolute',
      bottom: '0%',
      right: '0%',
      sx: { transform: 'rotate(-11deg)' },
      width: '25%'
    },
    {
      name: 'chicken',
      src: ChickbawkChicken,
      position: 'absolute',
      top: '8%',
      left: '4%',
      sx: { transform: 'rotate(46deg)' },
      width: '25%'
    },
    {
      name: 'from',
      src: ChickbawkFrom,
      position: 'absolute',
      top: '36%',
      left: '-3.5%',
      sx: { transform: 'rotate(90deg)' },
      width: '35%'
    }
  ]

  const chickbawkMessage = {
    name: 'message',
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
