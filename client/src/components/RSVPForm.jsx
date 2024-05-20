import * as React from 'react'

// prettier-ignore
import { Stack, TextField, Button, CircularProgress } from '@mui/material'
import { getDatabase, ref, push } from 'firebase/database'

const customTextfieldStyles = {
  '& .MuiFilledInput-root': {
    color: 'white',
    fontWeight: 'bold'
  },
  '& .MuiFilledInput-underline:before': {
    borderBottomColor: 'chickbawk.secondary' // Custom underline color
  },
  '& .MuiFilledInput-underline:hover:before': {
    borderBottomColor: 'chickbawk.light' // Custom underline color on hover
  },
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: 'chickbawk.accent' // Custom underline color when focused
  },
  '& .MuiInputLabel-root': {
    color: 'chickbawk.secondary' // Custom label color
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'chickbawk.accent' // Custom label color when focused
  }
}

const RSVPForm = (props) => {
  const [form, setForm] = React.useState({
    name: '',
    dietaryRestrictions: ''
  })
  const [errors, setErrors] = React.useState({
    name: ''
  })
  const [loading, setLoading] = React.useState(false)

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const onChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setForm((prevState) => ({ ...prevState, [name]: value }))
  }

  const writeRSVPData = () => {
    const db = getDatabase()
    push(ref(db, 'rsvp-forms'), {
      name: form.name,
      dietary_restrictions: form.dietaryRestrictions
    })
  }

  const clearForm = () => {
    setForm({
      name: '',
      dietaryRestrictions: ''
    })
  }

  const validateForm = () => {
    if (form.name.trim() === '') {
      setErrors((prevState) => ({
        ...prevState,
        name: 'WHO ARE YOU???'
      }))
      return false
    }
    return true
  }

  const onSubmit = async () => {
    console.log('Submitting form')
    if (validateForm()) {
      setLoading((prevState) => !prevState)
      await delay(500)
      writeRSVPData()
      setLoading((prevState) => !prevState)
      props.setRsvped(true)
      clearForm()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <Stack component='form' width='100%' spacing={2} onKeyDown={handleKeyDown}>
      <TextField
        autoComplete='off'
        variant='filled'
        label='Name'
        name='name'
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        value={form.name}
        onChange={onChange}
        sx={customTextfieldStyles}
      />
      <TextField
        autoComplete='off'
        variant='filled'
        label='Dietary Restrictions'
        name='dietaryRestrictions'
        fullWidth
        value={form.dietaryRestrictions}
        onChange={onChange}
        sx={customTextfieldStyles}
      />
      <Button
        variant='contained'
        fullWidth
        size='large'
        onClick={onSubmit}
        disabled={loading}
        endIcon={
          loading ? <CircularProgress size={26.25} color='inherit' /> : null
        }
        sx={{
          backgroundColor: 'chickbawk.secondary',
          color: 'chickbawk.light',
          fontWeight: '900',
          '&:hover': {
            backgroundColor: 'chickbawk.light',
            color: 'chickbawk.secondary'
          },
          boxShadow: '0px 0px 20px #FA971270'
        }}
      >
        {!loading && "I'm coming!"}
      </Button>
    </Stack>
  )
}

export default RSVPForm
