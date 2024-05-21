import * as React from 'react'

// prettier-ignore
import { Stack, TextField, Button, CircularProgress } from '@mui/material'
import {
  getDatabase,
  ref,
  push,
  query,
  orderByChild,
  equalTo,
  get
} from 'firebase/database'
import * as EmailValidator from 'email-validator'

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
    email: '',
    dietaryRestrictions: ''
  })
  const [errors, setErrors] = React.useState({
    name: '',
    email: ''
  })
  const [loading, setLoading] = React.useState(false)

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const onChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setForm((prevState) => ({ ...prevState, [name]: value }))
    setErrors({ name: '', email: '' })
  }

  const validNewEmail = async () => {
    const db = getDatabase()
    try {
      const emailQuery = query(
        ref(db, 'rsvp-forms'),
        orderByChild('email'),
        equalTo(form.email)
      )
      const emailSnapshot = await get(emailQuery)

      if (emailSnapshot.exists()) {
        props.setState('already-rsvped')
      }

      return !emailSnapshot.exists()
    } catch (error) {
      console.log('Error checking if email exists:', error)
      setLoading(false)
      throw error
    }
  }

  const writeRSVPData = async () => {
    const db = getDatabase()

    try {
      await push(ref(db, 'rsvp-forms'), {
        name: form.name,
        email: form.email,
        dietary_restrictions: form.dietaryRestrictions
      })
      console.log('RSVP entry added successfully.')
    } catch (error) {
      console.log('Error writing RSVP data:', error)
      setLoading(false)
      throw error
    }
  }

  const clearForm = () => {
    setForm({
      name: '',
      dietaryRestrictions: ''
    })
  }

  const validateForm = () => {
    let valid = true
    if (form.name.trim() === '') {
      setErrors((prevState) => ({
        ...prevState,
        name: 'WHO ARE YOU???'
      }))
      valid = false
    }

    if (!EmailValidator.validate(form.email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: 'INVALID EMAIL!!!'
      }))
      valid = false
    }

    return valid
  }

  const onSubmit = async () => {
    setLoading((prevState) => !prevState)

    if (validateForm() && (await validNewEmail())) {
      writeRSVPData()
      props.setState('rsvped')
    }

    clearForm()

    setLoading((prevState) => !prevState)
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
        label='Email'
        name='email'
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        value={form.email}
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
