import React from 'react'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import ErrorIcon from '@mui/icons-material/Error';

const ErrorMessage = ({message}) => {
  return (
    <Box sx={{
        display:"flex",
        alignItems:"center",
        gap:"5px",
        mt:"6px"
    }}>
        <ErrorIcon color='error' sx={{width:"20px"}} />
        <Typography variant="span" fontSize="14px" color="error">{message}</Typography>
    </Box>
  )
}

export default ErrorMessage