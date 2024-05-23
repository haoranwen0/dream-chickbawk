import * as React from 'react'

// prettier-ignore
import { Stack, TextField, Button, CircularProgress } from '@mui/material'
// prettier-ignore
import { getDatabase, ref, push, query, orderByChild, equalTo, get, runTransaction } from 'firebase/database'
import * as EmailValidator from 'email-validator'
import { useSearchParams } from 'react-router-dom'

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
  let [searchParams, setSearchParams] = useSearchParams()

  const [form, setForm] = React.useState({
    name: '',
    email: '',
    notes: ''
  })
  const [errors, setErrors] = React.useState({
    name: '',
    email: ''
  })
  const [loading, setLoading] = React.useState(false)

  const onChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setForm((prevState) => ({ ...prevState, [name]: value }))
    setErrors({ name: '', email: '' })
  }

  const validEmail = async (email, type = 'not-exists') => {
    const db = getDatabase()
    try {
      const emailQuery = query(
        ref(db, 'rsvp-forms'),
        orderByChild('email'),
        equalTo(email)
      )
      const emailSnapshot = await get(emailQuery)

      if (type === 'not-exists' && emailSnapshot.exists()) {
        props.setState('already-rsvped')
      }

      return type === 'exists'
        ? emailSnapshot.exists()
        : !emailSnapshot.exists()
    } catch (error) {
      console.log('Error checking if email exists:', error)
      setLoading(false)
      throw error
    }
  }

  const updateReferrerRSVPData = async (formId) => {
    const db = getDatabase()

    try {
      await runTransaction(
        ref(db, `rsvp-forms/${formId}/referral_count`),
        (currentCount) => {
          return (currentCount || 0) + 1
        }
      )
    } catch (error) {
      console.log("Error updating referrer's RSVP data:", error)

      throw error
    }
  }

  const getFormIdByEmail = async (email) => {
    const db = getDatabase()

    try {
      const emailQuery = query(
        ref(db, 'rsvp-forms'),
        orderByChild('email'),
        equalTo(email)
      )
      const snapshot = await get(emailQuery)

      if (snapshot.exists()) {
        // Iterate through the results to get the formId
        const data = snapshot.val()
        const formIds = Object.keys(data)

        if (formIds.length === 1) {
          return formIds[0] // Return the formId if there is exactly one matching entry
        } else {
          throw new Error(`Multiple or no entries found for email: ${email}`)
        }
      } else {
        throw new Error(`No entry found for email: ${email}`)
      }
    } catch (error) {
      console.log('Error getting referrer form id:', error)

      throw error
    }
  }

  const writeRSVPData = async (referrerEmail) => {
    const db = getDatabase()

    try {
      await push(ref(db, 'rsvp-forms'), {
        name: form.name.trim(),
        email: form.email.trim(),
        notes: form.notes,
        ...(referrerEmail !== null && { referrer: referrerEmail })
      })

      props.setUserId(form.email)
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
      notes: ''
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

    try {
      const referrerEmail = searchParams.get('referrer')

      const validReferrer =
        referrerEmail !== null && (await validEmail(referrerEmail, 'exists'))
      const validForm = validateForm() && (await validEmail(form.email))

      if (validForm) {
        if (validReferrer) {
          await writeRSVPData(referrerEmail)
          await updateReferrerRSVPData(await getFormIdByEmail(referrerEmail))
        } else {
          await writeRSVPData(null)
        }
        props.setState('rsvped')
      }

      clearForm()
    } catch (error) {
      console.log('Error submitting form:', error)

      throw error
    }

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
        label='Notes'
        placeholder='Dietary restrictions, favorite bbq chicken/beer flavor, ...'
        name='notes'
        fullWidth
        value={form.notes}
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
