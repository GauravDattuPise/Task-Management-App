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

    let user;
    if (isLogin) {
        user = JSON.parse(localStorage.getItem("user"));
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Logout function
    function handleLogout() {

        try {
            // changing isLogin into false, 
            dispatch(authActions.logout());

            localStorage.removeItem("user");
            localStorage.removeItem("allUsers")
            toast.success("Logged out Successfully");

                navigate("/");

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
                        isLogin && <Typography variant='h5' sx={{marginLeft : 60}}>{user.name}</Typography>
                    }
                    {/* if not logged in then show login & register page */}
                    {
                        !isLogin && <>

                            <Button LinkComponent={Link} to="/register" color='success' sx={{ marginLeft: "auto", marginRight: "10px" }} variant='contained'>Register</Button>
                            <Button LinkComponent={Link} to="/" color='success' variant='contained' >Login</Button>

                        </>
                    }

                    {/* if logged in then show pages for creating task & view task */}
                    {
                        isLogin && <>
                            <Box sx={{ marginLeft: "auto", marginRight: "10px" }}>
                                <Tabs value={false}>
                                    <Tab LinkComponent={Link} to="/my-task" label="My-Task" sx={{ color: "white" }}></Tab>
                                    <Tab LinkComponent={Link} to="/create-task" label="Create-Task" sx={{ color: "white" }}></Tab>
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