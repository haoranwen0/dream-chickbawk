import ChickbawkSoundMeow from '../assets/chickbawk-sound-meow.svg'
import ChickbawkSoundWoof from '../assets/chickbawk-sound-woof.svg'
import ChickbawkSoundBawk from '../assets/chickbawk-sound-bawk.svg'
import Woof from '../assets/audio/woof.mp3'
import Meow from '../assets/audio/meow.mp3'
import Bawk from '../assets/audio/bawk.mp3'

const chickbawkSounds = [
  {
    name: 'bawk',
    src: ChickbawkSoundBawk,
    sound: Bawk
    // position: 'absolute',
    // top: '-10%',
    // right: '20%',
    // sx: { transform: 'translate(50%, 0)', transition: 'visibility 250ms ease' },
    // width: '50%'
  },
  {
    name: 'meow',
    src: ChickbawkSoundMeow,
    sound: Meow
    // position: 'absolute',
    // top: '-10%',
    // right: '20%',
    // sx: { transform: 'translate(50%, 0)', transition: 'visibility 250ms ease' },
    // width: '50%'
  },
  {
    name: 'woof',
    src: ChickbawkSoundWoof,
    sound: Woof
    // position: 'absolute',
    // top: '-10%',
    // right: '20%',
    // sx: { transform: 'translate(50%, 0)', transition: 'visibility 250ms ease' },
    // width: '50%'
  }
]

export default chickbawkSounds
