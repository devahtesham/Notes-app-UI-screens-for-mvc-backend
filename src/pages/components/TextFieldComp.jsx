import { TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

const TextFieldComp = ({name,control,label,inputProps}) => {
  return (
    <>
        <Controller
            name={name}
            control={control}
            render={({ field }) => <TextField {...field} fullWidth required label={label} variant="outlined" InputProps={inputProps} sx={{marginBottom:"15px"}}/>}
        />
    </>
  )
}

export default TextFieldComp