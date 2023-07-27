import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import moment from "moment"
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TaskCard({ assignedBy, title, description, image, date, comments, id, status, taskHistory }) {

  // state for history
  const [showHistory, setShowHistory] = useState(false);

  const navigate = useNavigate();

  // converting date format
  let formatedDate = moment(date).format("DD MMM YYYY");
  formatedDate = `Assigned by ${assignedBy} on ${formatedDate}`

  function handleEditTask() {
    // sending taskId to task edit page via params
    navigate(`/tasks-edit/${id}`);
  }

  return (

    <Card sx={{ width: "40%", margin: "auto", mt: 2, boxShadow: "5px 5px 10px #ccc", marginTop: "100px" }}>


      <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
        <CardHeader
          sx={{ color: 'blue', marginTop: '0px', flex: 1 }}
          title={status}
          subheader={formatedDate}
        />
        <IconButton
          sx={{ background: 'red', marginTop: '15px', marginRight: "20px" }}
          onClick={handleEditTask}
        >
          <EditIcon />
        </IconButton>
      </Box>

      {/* image component */}
      <CardMedia
        component="img"
        height="250"
        image={image}
        alt="task image"
      />

      {/* card title & description */}
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Title : {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Description : {description}
        </Typography>

        <Typography variant="body2" color="text.secondary">

          {/* show comments */}
          {
            comments.length > 0 && <>

              <h2 style={{ color: "blue" }}>comments are</h2>
              {comments.map((commentData) => (
                <h3 key={commentData._id}> Name :- {commentData.postedBy}
                  <h4 style={{ marginTop: "0px" }}> {commentData.text}</h4>
                </h3>
              ))}
            </>
          }

          {
            comments.length === 0 && <>
              <h2 style={{ color: "red" }}>Comments are not available</h2>
            </>
          }
        </Typography>

        {
          !showHistory && <Button onClick={() => setShowHistory(true)} variant='contained' size='small' sx={{ marginLeft: "380px" }}>Show history</Button>

        }

        {
          showHistory && <Button onClick={() => setShowHistory(false)} variant='contained' size='small' sx={{ marginLeft: "380px" }}>Hide history</Button>
        }

        {/* show history of task*/}
        {
          showHistory === true && (<>
            <div>
              <h3>Task History:</h3>
              <ul>
                {taskHistory.map((historyItem, index) => (
                  <li key={index}>
                    <p>Date: {moment(historyItem.timestamp).format("DD MMM YYYY")}</p>
                    <p style={{ marginTop: "1px" }}>Event Type: {historyItem.eventType}</p>
                    {historyItem.eventType === 'comment' && (
                      <div>
                        <p>Comment: {historyItem.data.comment}</p>
                        <p>User Name: {historyItem.data.userName}</p>
                      </div>
                    )}
                    
                  </li>
                ))}
              </ul>
            </div>
          </>)
        }

      </CardContent>

    </Card>
  );
}
