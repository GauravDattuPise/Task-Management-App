import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import { toast } from 'react-hot-toast';

import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../../redux/store';

const Header = () => {

    // global state
    let isLogin = useSelector((state) => state.isLogin);
    isLogin = isLogin || localStorage.getItem("user");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // function handleRegister() {
    //     navigate("/register");
    // }

    function handleLogout() {

        try {
            // changing isLogin into false, 
            dispatch(authActions.logout());

            localStorage.removeItem("user");
            toast.success("Logged out Successfully");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            toast.error("Error in logout");
            console.log(error)
        }
    }
    return (
        <div>
            <AppBar  >
                <Toolbar>
                    <Typography variant='h5'>Task Management App</Typography>
                    {
                        !isLogin && <>

                            <Button LinkComponent={Link} to="/register" color='success' sx={{ marginLeft: "auto", marginRight: "10px" }} variant='contained'>Register</Button>
                            <Button LinkComponent={Link} to="/login" color='success' variant='contained' >Login</Button>

                        </>
                    }
                    {
                        isLogin && <>
                            <Box sx={{ marginLeft: "auto", marginRight: "10px" }}>
                                <Tabs>
                                    <Tab color='secondary' label="Create-Task" sx={{ color: "white" }}></Tab>
                                </Tabs>
                            </Box>

                            <Button color='error' variant='contained' onClick={handleLogout}>logout</Button>
                        </>
                    }
                    
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header