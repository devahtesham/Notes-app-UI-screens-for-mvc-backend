import React, { useEffect } from 'react'
import { Avatar, Box, InputAdornment, Typography } from '@mui/material'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import InputField from './components/InputField';
import ButtonComp from './components/ButtonComp';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { passwordRegExp, phoneRegExp } from './components/utils/utils';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// creating schema validation
const schema = yup.object({
    name: yup.string().required("Full Name is a Required Field"),
    email: yup.string().required("Email address is a Required Field").email(),
    password: yup.string().required("Password is a Required Field").matches(passwordRegExp,"Must Contain 8 characters, One Uppercase, One Lowercase, One Number and One special character"),
    mobileNumber: yup.string().required("Phone Number is a Required Field").matches(phoneRegExp,"Phone number is not valid "),
})


const SignUp = () => {
const { handleSubmit,control,formState:{errors}, reset }  = useForm({
    defaultValues:{
        name:"",
        email:"",
        password:"",
        mobileNumber:"",
    },
    resolver: yupResolver(schema)
}) 
const navigate = useNavigate()

useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
        navigate("/dashboard")
    }
},[])

// console.log("errors",errors);
const formSubmitHandler = (data)=>{
    // console.log("data",data)
    axios.post("https://notes-app-dev-ak.cyclic.app/api/signup",data)
        .then((res)=>{
            console.log("res",res.data)
            // send user name to local storage to display on login page 
            localStorage.setItem("username",res.data.data.name)
            reset()
            toast.success(res.data.message)         // using react hot toast library for notification popup
            navigate("/login")
        })
        .catch((err)=>{
            console.log("err",err)
            toast.error(err.response.data.message)   // using react hot toast library for notification popup
        })
}
    return (
        <Container maxWidth="sm">
            <Box sx={{
                display:"flex",
                flexFlow:"column",
                alignItems:"center",
                mt :"4rem"
            }}>
                <Avatar sx={{
                    backgroundColor: "purple", 
                    m: 1,
                }}>
                    <HowToRegIcon />
                </Avatar>
                <Typography component="h1">Signup</Typography>
                <Box noValidate onSubmit={handleSubmit(formSubmitHandler)} component={"form"} sx={{
                    width:"100%",
                    mt:"2rem"
                }}>
                    <InputField label={"Full Name"} inputProps={{type:"text"}} control={control} name="name" errors={errors}/>  
                    <InputField label={"Email"} inputProps={{type:"email"}} control={control} name="email" errors={errors}  />  
                    <InputField label={"Password"} inputProps={{type:"password"}} control={control} name="password" errors={errors}/>  
                    <InputField label={"Phone"} inputProps = {{
                        startAdornment: <InputAdornment position="start">+92</InputAdornment>,
                        type:"number"
                    
                    }} control={control} name="mobileNumber" errors={errors} />  
                    <ButtonComp buttonName="Signup" buttonType="submit" />
                </Box>        
            </Box>
        </Container>
    )
}

export default SignUp