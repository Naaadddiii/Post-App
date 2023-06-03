import { CardMedia, Typography, CardContent, Avatar, Card, CardHeader, IconButton, Box, Modal,} from '@mui/material'
import React, { useState, useEffect } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CommentIcon from '@mui/icons-material/Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostComment from './PostComment';

const Post = ({title, description, image,  userName, isUser, userAvatar, id}) => {
    const navigate = useNavigate();
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [open, setOpen] = useState(false);
    //const [showComment, setShowComment] = useState({bottom: false})

    // const toggleDrawer = (anchor, open) => (event) => {
    //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //     return;
    //   }
  
    //   setShowComment({ ...showComment, [anchor]: open });
    // };


    const handleOpen = () => {
      setOpen(true);
    };    
    const handleClose = (e) => {
      setOpen(false);
      navigate('/myPosts/');
    };    
    const deleteRequest = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
        const res = await axios.delete(`http://localhost:5000/api/post/${id}`, config)
        .catch(error=>console.log(error));
        const data = await res.data;
        return data;
    }
        const handleDelete = (e) => {
        deleteRequest().then((data)=>console.log(data))
        localStorage.removeItem(`post-${id}-likes`, likes);
    }
    const handleEdit = (e)=> {
        navigate(`/myPosts/${id}`)
    }
    console.log(description, image, isUser)


    const handleLike = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    try {
      await axios.post(`http://localhost:5000/api/post/${id}/like`, null, config);
      setLikes(prevLikes => prevLikes + 1);
      setLiked(true);
      localStorage.setItem(`post-${id}-likes`, likes+1); 
    } catch (error) {
      console.log(error);
    }
  }; 
    const handleUnlike = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    try {
      await axios.post(`http://localhost:5000/api/post/${id}/unlike`, null, config);
      setLikes(prevLikes => prevLikes - 1);
      setLiked(false);
      localStorage.setItem(`post-${id}-likes`, likes-1); 
    } catch (error) {
      console.log(error);
    }
  };  
  useEffect(() => {
    const storedLikes = localStorage.getItem(`post-${id}-likes`);
    if (storedLikes) {
      setLikes(parseInt(storedLikes));
    }
  }, []);    
  return (
    <div>
       <Card
            sx={{ width: "40%", 
            margin: 'auto', 
            mt: 2, 
            padding:2, 
            boxShadow: "5px 5px 10px #ccc" , 
            ":hover" : {
            boxShadow: "10px 10px 20px #ccc"
            }
    }}>   
    {isUser && (
            <Box display='flex'>
                 <IconButton onClick={handleDelete} sx={{marginLeft:'auto'}}><DeleteIcon/></IconButton> 
                 <IconButton onClick={handleEdit}><EditIcon/></IconButton>
                 <IconButton onClick={handleOpen}><MoreHorizIcon/></IconButton>
                 <IconButton onClick={handleClose}><CloseIcon /></IconButton>
            </Box>    )}
        {!isUser && (
          <Box display='flex'>  
          <IconButton sx={{marginLeft:'auto'}} onClick={handleOpen}><MoreHorizIcon/></IconButton>
          <IconButton onClick={handleClose}><CloseIcon /></IconButton>
          </Box>   )}
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
          {userName.charAt(0)}
          </Avatar> }
            title={ 
            <Typography sx={{ fontWeight: 'bold' }}>
            {userName}
            </Typography>
          } />
       {image &&  <CardMedia
        component="img"
        height="auto"
        image={`http://localhost:5000/uploads/${image}`}
        />}
      <CardContent>
        <Typography variant="h6" color="text.secondary">
            {description}
        </Typography>
      </CardContent>      
      {isUser && (
      <Box display='flex' alignItems='center'>
      <IconButton onClick={handleLike}><ThumbUpIcon /></IconButton>
      <IconButton onClick={handleUnlike}><ThumbDownIcon /></IconButton>
      <Typography>{likes} likes</Typography>
      <IconButton onClick={handleOpen}>
        <CommentIcon />
      </IconButton>
      </Box>  )}       
      {!isUser && (
          <Box display='flex' alignItems='center'>
            <IconButton onClick={handleLike}><ThumbUpIcon /></IconButton>
            <IconButton onClick={handleUnlike}><ThumbDownIcon /></IconButton>
            <Typography>{likes} likes</Typography> 
            <IconButton onClick={handleOpen}>
        <CommentIcon />
      </IconButton>
          </Box> )}   
    </Card> 
    <PostComment userName={userName} 
       id={id} 
       userAvatar={userAvatar} />
    <Modal
      open={open}
      onClose={handleClose}>
  <Box sx={{ p: 2 }}>
    <Post
      title={title}
      description={description}
      image={image}
      userName={userName}
      isUser={isUser}
      id={id}
      closeModal={() => setOpen(false)}
      handleLike={handleLike}
      handleUnlike={handleUnlike}
    />    
  </Box>  
</Modal>  
 
  </div>
  )
}
export default Post;

