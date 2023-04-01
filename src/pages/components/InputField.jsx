import { Box } from '@mui/system'
import { FormControl, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { Controller } from "react-hook-form";
import { addErrorIntoFields } from './utils/utils';
import ErrorMessage from './ErrorMessage';

const InputField = ({label,inputProps,type,control,name,errors}) => {
  return (
    <FormControl fullWidth sx={{
        mb:"1rem"
    }}>
        <Controller
            name={name}
            control={control}
            render={({ field }) =>  <TextField {...field} required label={label} variant="outlined" InputProps={inputProps} {...addErrorIntoFields(errors[name])} />}
      />
        {
            errors[name] ? <ErrorMessage message={errors[name].message} /> : null
        }
    </FormControl>
  )
}

export default InputField