import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Post from './Post';

const UserPosts = () => {
  const [user, setUser] = useState()
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const res = await axios.get(`http://localhost:5000/api/post/user/${id}`, config)
    .catch(error=> console.log(error))
    const data = await res.data;
    return data; 
  }
  useEffect(() => {
    sendRequest().then((data)=>setUser(data.user))
  },[]);
  console.log(user)
   return (
    <div>
     {user && user.posts && user.posts.map((post,index)=>(
        <Post 
        id={post._id}
        isUser={true}
        key={index}
        title={post.title} 
        description={post.description}
        image={post.image} 
        userName={user.name}/>
       ))}
    </div>
  )
}

export default UserPosts