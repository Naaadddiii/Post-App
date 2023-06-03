import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  
  const [liked, setLiked] = useState(false);

  const loadPosts = async (page) => {
    const token = localStorage.getItem('token');
    const data = await axios.get(`http://localhost:5000/api/post?page=${page}&limit=3`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.data)
    .catch(error => console.log(error));
    if (page === 1) {
      setPosts(data.posts);
    } else {
      setPosts(prevPosts => [...prevPosts, ...data.posts]);
    }
    setTotalPages(data.totalPages);
    setCurrentPage(page);
  };

  useEffect(() => {
    loadPosts(currentPage);  
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      const nextPage = currentPage + 1;
      if (nextPage <= totalPages) {
        loadPosts(nextPage);
      }
    }
  };

  const handleLike = async (id, setLiked) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try{
      await axios.post(`http://localhost:5000/api/post/${id}/like`, {}, config);
      setLiked(true);
    }catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async (id, setLikes, setLiked) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try{
      await axios.post(`http://localhost:5000/api/post/${id}/unlike`, {}, config);
      setLiked(false);
    }catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, totalPages]);

  return (
    <div>
      {posts.map((post, index) => (
        <Post
          key={post._id}
          id={post._id}
          isUser={localStorage.getItem("userId") === post.user._id}
          title={post.title}
          description={post.description}
          image={post.image}
          userName={post.user.name}
          liked={liked}
          handleLike={() => handleLike(post._id, setLiked)}
          handleUnlike={() => handleUnlike(post._id, setLiked)}         
          
          >
          </Post>
        ))}
      </div>
    );
  };
  
  export default Posts;





//--------------Pagination-------------------

// const Posts = () => {
//   const [posts, setPosts] = useState();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState();

//   const sendRequest = async (page, limit) => {
//     const res = await axios.get(`http://localhost:5000/api/post?page=${page}&limit=${limit}`)
//     .catch(error => console.log(error));
//     const data = await res.data;
//     return data;
//   };

//   useEffect(() => {
//     sendRequest(currentPage, 3)
//       .then((data) => {
//         setPosts(data.posts);
//         setTotalPages(data.totalPages);
//       });
//   }, [currentPage]);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div>
//       {posts && posts.map((post, index) => (
//         <Post
//           key={post._id}
//           id={post._id}
//           isUser={localStorage.getItem("userId") === post.user._id}
//           title={post.title}
//           description={post.description}
//           image={post.image}
//           userName={post.user.name}
//         />
//       ))}

//       <div  className="d-flex justify-content-center">
//         <Pagination style={{padding: '2rem', margin: 'auto'}}>
//           <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
//           {[...Array(totalPages)].map((_, index) => (
//             <Pagination.Item
//               key={index + 1}
//               active={index + 1 === currentPage}
//               onClick={() => setCurrentPage(index + 1)}
//             >
//               {index + 1}
//             </Pagination.Item>
//           ))}
//           <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
//         </Pagination>
//       </div>
//     </div>
//   );
// };

// export default Posts;










