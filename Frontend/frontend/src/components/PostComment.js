import React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CssBaseline,
  Button,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,  
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
//import { MentionsInput, Mention } from 'react-mentions';

function PostComment({ id  }) {
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user");
        const userData = res.data.users;
        setUsers(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const userMentions = users.map((myUser) => ({
    display: myUser.name,
    id: myUser._id,
    username: myUser.name,
    email: myUser.email
  }));
  console.log(userMentions, "adgfhuyfghyasghdfaghd")

  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await axios.get(
          `http://localhost:5000/api/post/${id}/comments`,
          config
        );
        setComments(res.data.comments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [id]);

  const onClickHandler = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const newComment = {
        comment: comment,
        
      };
      const response = await axios.post(
        `http://localhost:5000/api/post/${id}/comment`,
        newComment,
        config
      );
      setComments([...comments, response.data.comment]);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteHandler = async (commentId) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.delete(
        `http://localhost:5000/api/post/${id}/comment/${commentId}`,
        config
      );
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.log(error);
    }
  };

  const onEditHandler = async (commentId, updatedComment) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.put(
        `http://localhost:5000/api/post/${id}/comment/${commentId}`,
        { comment: updatedComment },
        config
      );
      const updatedComments = comments.map((comment) =>
        comment.id === commentId ? response.data.comment : comment
        
      );
      setComments(updatedComments);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = (e) => {
    
    setComment(e.target.value);
  };


  const handleEditComment = (commentId, currentComment) => {
    const updatedComment = prompt("Enter updated comment", currentComment);
    if (updatedComment) {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      onEditHandler(commentId, updatedComment, config);
    }
  };
  return (
    <>
    <CssBaseline />
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <div className="main-container">      
        <h3 style={{ marginBottom: "10px"}}>Leave a Comment</h3>
        <TextField
            id="outlined-multiline-flexible"
            label="Write a comment"
            multiline
            maxRows={4}
            value={comment}
            onChange={onChangeHandler}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "20px" }}
            />
              <Button variant="contained" onClick={onClickHandler}>
              Post Comment
              </Button>
                  <List sx={{ marginTop: "20px" }}>
                      {comments.map((comment) => (
                        <ListItem key={comment.id}>
                          <ListItemAvatar>
                             <Avatar sx={{ bgcolor: 'lightblue' }} aria-label="recipe">
                                   {comment.userName && comment.userName.charAt(0)}
                             </Avatar>
                          </ListItemAvatar>
                        <ListItemText 
                                 primary={comment.comment} 
                                 secondary={comment.userName ? comment.userName + " at " + comment.timestamp : "anonymous"} />                        
                          <IconButton onClick={() => handleEditComment(comment.id, comment.comment)}>
                              <EditIcon />
                           </IconButton>
                           <IconButton onClick={() => onDeleteHandler(comment.id)}>
                             <DeleteIcon />
                           </IconButton>
                                
                        </ListItem>
                        ))}
                </List>
              </div>
          </Card>
          </>
        );
      }
 export default PostComment;










// import { useEffect, useState } from "react";
// import { Card, CssBaseline, Button, TextField, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
// import axios from "axios";

// function PostComment({ userName, id }) {

//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);
  

//   useEffect(() => {
//     const fetchComments = async () => {
//       const token = localStorage.getItem('token');
//       const config = {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       };
//       try {
//         const res = await axios.get(`http://localhost:5000/api/post/${id}/comments`, config);
//         setComments(res.data.comments);
//       } catch (error) {
//         console.log(error);
//       }
//     };
    
//     fetchComments();
//   }, [id]);

//   const onClickHandler = async () => {
//     const token = localStorage.getItem('token');
//     const config = {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     };
//     try {
//       const newComment = {
//         comment: comment,
//       };
//       const response = await axios.post(`http://localhost:5000/api/post/${id}/comment`, newComment, config);
//       setComments([...comments, response.data.comment]);
//       setComment("");
//     } catch (error) {
//       console.log(error);
//       // handle error
//     }
//   };
  
//   const onChangeHandler = (e) => {
//     setComment(e.target.value);
//   };

//   return (
//     <Card
//       sx={{
//         width: "40%",
//         margin: 'auto',
//         mt: 2,
//         padding: 2,
//         boxShadow: "5px 5px 10px #ccc",
//         ":hover:": {
//           boxShadow: "10px 10px 20px #ccc"
//         }
//       }}
//     >
//       <div className="main-container">
//         <CssBaseline />
//         <h3 style={{ marginBottom: '10px' }}>Comments</h3>
//         <div>
//           <TextField
//             id="outlined-basic"
//             label="Enter your comment"
//             variant="outlined"
//             fullWidth
//             value={comment}
//             onChange={onChangeHandler}
//             sx={{ marginBottom: '10px' }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={onClickHandler}
//           >
//             Submit
//           </Button>
         
//           <List>
//   {Array.isArray(comments) && comments.map((comment) => (
//     <ListItem key={comment.id} alignItems="flex-start">
//       <ListItemAvatar>
//         <Avatar sx={{ bgcolor: 'lightblue' }} aria-label="recipe">
//           {comment.userName && comment.userName.charAt(0)}
//         </Avatar>
//       </ListItemAvatar>
//       <ListItemText
//         primary={comment.comment}
//         secondary={comment.userName + " at " + comment.timestamp}
//       />
//     </ListItem>
//   ))}
//   </List>
//         </div>
//       </div>
//     </Card>
//   );
// }

// export default PostComment;


