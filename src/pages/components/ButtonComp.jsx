import { Box, Button } from '@mui/material'
import React from 'react'

const ButtonComp = ({buttonName,buttonType,onBtnClick}) => {
  return (
    <Box sx={{mt:"15px"}}>
        <Button type={buttonType} variant="contained" sx={{width:"100%",py:"10px"}} onClick={onBtnClick}>{buttonName}</Button>
    </Box>
  )
}

export default ButtonComp