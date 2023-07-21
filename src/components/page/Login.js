import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-hot-toast"

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useDispatch } from 'react-redux'
import { authActions } from '../../redux/store'

const Login = () => {

    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // state for inputs
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    // handling input 
    function handleInputChange(e) {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // user registration
    async function handleLogin(e) {

        e.preventDefault();

        try {
            const userObj = {
                email: inputs.email,
                password: inputs.password
            }

            // sending data to backend
            const res = await axios.post("/user/login", userObj)

            // toast message
            if (res.data.status) {
                toast.success(res.data.message);

                // calling the login function of reducers & making login state as true
                dispatch(authActions.login());

                // converting js object into json string to store in localstorage
                const user = JSON.stringify(res.data.user);
                const allUsers = JSON.stringify(res.data.userArray);

                console.log(allUsers);
                // setting user in localstorage
                localStorage.setItem("user", user);
                localStorage.setItem("allUsers", allUsers);


                setTimeout(()=>{
                    navigate("/create-task")
                },1500)
            }
            else {
                toast.error(res.data.message)
            }

        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        }
    }

    return (

        <>
            <form onSubmit={handleLogin} >

                <Box sx={{ borderRadius: "30px", boxShadow: "5px 5px 5px 5px #ccc" }} display={'flex'} flexDirection={'column'} alignItems='center' justifyContent={'center'} margin={'auto'} padding={3} marginTop={15} width={550} height={400} >

                    <Typography variant='h2' color={'gray'}>Login</Typography>

                    {/* email field */}
                    <TextField
                        variant='outlined'
                        sx={{ width: "350px", marginTop: "30px" }}
                        label=" Email"
                        type={"email"}
                        name='email'
                        margin='normal'
                        value={inputs.email}
                        onChange={handleInputChange}
                        required
                    />

                    {/* password field */}
                    <TextField
                        variant='outlined'
                        sx={{ width: "350px" }}
                        label=" Passsword"
                        type={showPassword ? "text" : 'password'}
                        name='password'
                        margin='normal'
                        value={inputs.password}
                        onChange={handleInputChange}
                        required

                        // hide & show password
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <Button onClick={() => setShowPassword((preState) => !preState)}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </Button>
                                </InputAdornment>
                            )
                        }}
                    />

                    {/* login button */}
                    <Button type='submit' variant='contained' size='large' sx={{ marginTop: 3, borderRadius: 3, width: "200px" }}>login</Button>

                    {/* button for navigate to register */}
                    <Button onClick={() => navigate("/register")} sx={{ marginTop: 3, textTransform: 'capitalize' }}>
                        Not a user ? Please register
                    </Button>

                </Box>
            </form>
        </>

    )
}

export default Login