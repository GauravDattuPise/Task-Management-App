import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import TaskCard from '../Header/TaskCard';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MyTask = () => {

    const [userTasks, setUserTasks] = useState([]);

    const navigate = useNavigate();

    // using userId, getting user's tasks
    async function getUserId() {

        try {
            let user = JSON.parse(localStorage.getItem("user"))
            let userId = user._id;

            const { data } = await axios.get(`/task/my-tasks/${userId}`)

            if (data?.status === true) {
                setUserTasks(data?.myTasks);
            }

        } catch (error) {
            toast.error("Error in get my task.")
            console.log("error in get my task", error)
        }
    }

    useEffect(() => {
        getUserId();
    }, []);

    useEffect(() => {

    }, [userTasks]);

    return (
        <div>
            {/* passing task data as props to TaskCard component */}
            {
                userTasks.length > 0 && userTasks.map(task =>
                    <TaskCard
                        key={task._id}
                        title={task?.title}
                        id={task?._id}
                        description={task?.description}
                        image={task?.image}
                        date={task?.createdAt}
                        status={task?.status}
                        assignedBy={task?.assignedBy}
                        comments={task?.comments}
                        taskHistory={task?.history}
                    />)
            }

            {/* if user doesn't have any task */}
            {
                userTasks.length < 1 && <>

                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        marginTop="100px"
                    >
                        <Typography
                            variant="h4"
                            component="h1"
                            style={{ marginBottom: '20px', textAlign: 'center', color: "red" }}
                        >
                            You don't have any tasks
                        </Typography>
                        <img
                            src="https://www.shutterstock.com/shutterstock/photos/2075609020/display_1500/stock-vector-no-stress-and-relaxation-at-work-concept-young-relaxed-woman-cartoon-character-sitting-in-office-2075609020.jpg" // Replace with your own image URL
                            alt="Empty tasks"
                            style={{ maxWidth: '40%', height: '400px' }}
                        />

                        <Button onClick={() => navigate("/create-task")} sx={{ marginTop: "50px" }} variant='contained'>Click here to create tasks</Button>
                    </Box>

                </>

            }
        </div>

    )
}

export default MyTask