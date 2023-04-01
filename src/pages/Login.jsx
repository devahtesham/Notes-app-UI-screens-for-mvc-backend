
import { Avatar, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import { Box, Container, width } from '@mui/system'
import React, { useEffect, useState } from 'react'
import BgImg from "../pages/images/bg-img.jpg"
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InputField from './components/InputField';
import ButtonComp from './components/ButtonComp'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import TextFieldComp from './components/TextFieldComp'

const Login = () => {
    const {control,handleSubmit} = useForm({
        defaultValues:{
            email:"",
            password:""
        }
    })
    const [loginUsername,setLoginUsername] = useState("")
    useEffect(()=>{
        const username = localStorage.getItem("username");
        setLoginUsername(username)
    },[])
    const navigate = useNavigate()

useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
        navigate("/dashboard")
    }
},[])

    const loginFormHandler = (data)=>{
        console.log(data);
        axios.post("https://notes-app-dev-ak.cyclic.app/api/login",data)
            .then((res)=>{
                const userObject = res.data.data
                const token = res.data.token
                localStorage.setItem("user",JSON.stringify(userObject))
                localStorage.setItem("token",token)
                toast.success(res.data.message)         // using react hot toast library for notification popup
                navigate("/dashboard")
            })
            .catch((err)=>{
                console.log("err",err);
                toast.error(err.response.data.message)   // using react hot toast library for notification popup
            })

    }

  return (
    <>
        <Box sx={{display:"flex",overflow:"hidden"}} >
            <Box sx={{height:"100vh",flexBasis:"60%"}}>
                <img src={BgImg} alt="" style={{width:"100%",height:"100%"}} />
            </Box>
            <Box sx={{height:"100vh",flexBasis:"40%"}}>
                
                    <Box noValidate onSubmit={handleSubmit(loginFormHandler)} component="form" sx={{height:'100%', width:"70%", margin:"auto",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                        <Box sx={{
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            mb:4
                            
                        }}>
                            <Typography variant='h4'>Hi, {loginUsername}</Typography>
                            <Avatar sx={{backgroundColor:"#000",padding:"20px",mt:2}}>
                                <LockOpenIcon fontSize='small'/>
                            </Avatar>
                        </Box>
                        <Box>
                            <TextFieldComp name="email" control={control} label={"Enter Your Email"} inputProps={{type:"text"}} />
                            <TextFieldComp name="password" control={control} label={"Enter Your Password"} inputProps={{type:"password"}} />
                            <ButtonComp buttonName="Login" buttonType="submit"/>
                            <ButtonComp buttonName="Dont Have an Account" buttonType="button" onBtnClick={()=>{
                                navigate("/")
                                localStorage.clear()
                            }}  />
                        </Box>
                    </Box>
                
            </Box>
        </Box>
    </>
  )
}

export default Login