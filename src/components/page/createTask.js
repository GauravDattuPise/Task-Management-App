import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// creating blog
const CreateTask = () => {

    const navigate = useNavigate();

    // state
    const [inputs, setInputs] = useState({
        title: "",
        image: "",
        description: ""
    });

    // getting user from localstorage 
    const user = JSON.parse(localStorage.getItem("user"))

    // updating state
    function handleInputChange(e) {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    // sending blog data
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const taskData = {
                title: inputs.title,
                image: inputs.image,
                description: inputs.description,
                user: user._id
            }

            const { data } = await axios.post("task/create-task", taskData);

            if (data.status) {
                toast.success(data.message)

                setTimeout(() => {
                    navigate("/my-tasks")
                }, 1500)
            }
        } catch (error) {
            toast.error("Error in creating task")
            console.log(error);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box width={"45%"} boxShadow={"10px 10px 20px 10px #ccc"} padding={3} margin={"auto"} marginTop={15} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}  >
                    <Typography variant='h3' fontWeight={"bold"} color={"gray"} >Create a Task </Typography>

                    {/* blog title */}
                    <TextField
                        type='text'
                        margin='normal'
                        sx={{ width: "500px" }}
                        variant='outlined'
                        label="Task Title"
                        name='title'
                        value={inputs.title}
                        onChange={handleInputChange}
                        required>
                    </TextField>

                    {/* blog image link */}
                    <TextField
                        type='text'
                        margin='normal'
                        sx={{ width: "500px" }}
                        variant='outlined'
                        label="Image URL"
                        name='image'
                        value={inputs.image}
                        onChange={handleInputChange}
                        required
                    />

                    {/* blog description */}
                    <TextField
                        type='text'
                        margin='normal'
                        multiline
                        minRows={4}
                        sx={{ width: "500px" }}
                        variant='outlined'
                        label="Description"
                        name='description'
                        value={inputs.description}
                        onChange={handleInputChange}
                        required>
                    </TextField>

                    {/* create blog button */}
                    <Button variant='contained' type='submit' size='large' sx={{ mt: 3 }}>create</Button>
                </Box>
            </form>
        </div>
    )
}

export default CreateTask