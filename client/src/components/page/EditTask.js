

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';

// Edit task function
const EditTask = () => {

    let user = JSON.parse(localStorage.getItem("user"))
    let userName = user.name;

    // state to update task state
    const [selectedStatus, setSelectedStatus] = useState('TO DO');
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    // getting id from params
    const { id } = useParams();

    const navigate = useNavigate();

    // state for comment
    // const [inputs, setInputs] = useState({
    //     comment: '',
    // });

    const [comment, setComment] = useState("");

    // // updating state
    // function handleInputChange(e) {
    //     setInputs((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }));
    // }

    async function handleEditTask(e) {
        e.preventDefault();

        try {

            const task = {};
            if(comment.trim() == ""){
                 task.status = selectedStatus;
                 task.userName = userName;
            }
            else{
                task.status = selectedStatus;
                task.comment = comment;
                task.userName = userName;
            }

            const { data } = await axios.put(`/task/update-task/${id}`, task );

            if (data?.status) {
                toast.success(data?.message);
                navigate('/my-task');
            }

        } catch (error) {
            toast.error('Error in updating the task');
            console.log('Error in updating the task', error);
        }
    }

    return (
        <>
            <form onSubmit={handleEditTask}>
                <Box
                    width={'50%'}
                    boxShadow={'10px 10px 20px #ccc'}
                    padding={3}
                    margin={'auto'}
                    marginTop={15}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Typography variant='h4' fontWeight={'bold'} color={'gray'}>
                        Update a Task Status
                    </Typography>

                    {/* field to select task status */}
                    <FormControl margin='normal' sx={{ width: '500px' }}>
                        <InputLabel>Status</InputLabel>
                        <Select value={selectedStatus} onChange={handleStatusChange}>
                            <MenuItem value='TO DO'>TO DO</MenuItem>
                            <MenuItem value='DOING'>DOING</MenuItem>
                            <MenuItem value='DONE'>DONE</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        type='text'
                        margin='normal'
                        sx={{ width: '500px' }}
                        variant='outlined'
                        label='Add Comment'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <Button variant='contained' type='submit' size='large' sx={{ mt: 3 }}>
                        Update
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default EditTask;
