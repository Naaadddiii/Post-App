// import { Button, Form } from 'react-bootstrap';
// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AddPost = ({userName, id}) => {
//   const navigate = useNavigate();
//   const [inputs, setInputs] = useState({
//     title: "",
//     description: "",
//     image: ""
//   });

//   const handleChange = (e) => {
//     setInputs((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value
//     })); 
//   };

//   const handleImageChange = (e) => {
//     setInputs((prevState) => ({
//       ...prevState,
//       image: e.target.files[0]
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(inputs);
//     const token = localStorage.getItem('token');
//     const formData = new FormData();
//     formData.append("description", inputs.description);
//     formData.append("user", localStorage.getItem("userId"));
    
//     if(inputs.image) {
//       formData.append("image", inputs.image);
//     }
//     const config = {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     };
//     try {
//       const res = await axios.post("http://localhost:5000/api/post/add", formData, config);
//       console.log(res.data);
//       navigate('/posts/');
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
//   return (
//     <div>
//       <Form onSubmit={handleSubmit}>
//         <div className="border border-dark rounded-3 p-3 m-3 w-75 mx-auto">
//           <h2 className="text-center text-secondary fw-bold mb-3">Post</h2>
          
//           <Form.Group className="mb-3" controlId="description">
//             <Form.Label className="fw-bold fs-4 mb-1">Description</Form.Label>
//             <Form.Control 
//               as="textarea" 
//               rows={5} 
//               name="description" 
//               value={inputs.description} 
//               onChange={handleChange} 
//               placeholder="Enter description"               
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="image">
//             <Form.Label className="fw-bold fs-4 mb-1">Image</Form.Label>
//             <input 
//              className="form-control"
//               type="file" 
//               name="image" 
//               onChange={handleImageChange} 
//               accept=".jpg,.jpeg,.png"                        
//             />
//           </Form.Group>
//           <Button className="mt-3" variant="warning" type="submit">Submit</Button>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default AddPost;


/////////////////////****React-Mentions****////////////////////////////////////////


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MentionsInput, Mention } from 'react-mentions';


// const AddPost = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/user");
//         const userData = res.data.users;
//         setUsers(userData);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const userMentions = users.map((myUser) => ({
//     display: myUser.name,
//     id: myUser._id,
//     username: myUser.name,
//     email: myUser.email
//   }));
//   console.log(userMentions, "adgfhuyfghyasghdfaghd")

//   const navigate = useNavigate();
//   const [inputs, setInputs] = useState({
//     title: "",
//     description: "",
//     image: ""
//   });


// const handleChange = (e, newValue, newPlainTextValue, mentions) => {
//     setInputs((prevState) => ({ ...prevState, description: newPlainTextValue }));
//   };
  

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setInputs((prevState) => ({ ...prevState, image: file }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(inputs);
//     const token = localStorage.getItem('token');
//     const formData = new FormData();
//     formData.append("description", inputs.description);
//     formData.append("user", localStorage.getItem("userId"));
//     if (inputs.image) {
//       formData.append("image", inputs.image);
//     }
//     const config = {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     };

//     try {
//       const res = await axios.post("http://localhost:5000/api/post/add", formData, config);
//       console.log(res.data);
//       navigate('/posts/');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="border border-dark rounded-3 p-3 m-3 w-75 mx-auto">
//           <h2 className="text-center text-secondary fw-bold mb-3">Post</h2>
          
//           <div className="form-group mb-3">
//             <label className="fw-bold fs-4 mb-1" htmlFor="description">Description</label>
//             <MentionsInput 
//               markup="@{{__id__}}"
//               value={inputs.description}
//               onChange={handleChange} 
//               placeholder="Enter description"  >
//               <Mention
//                 trigger="@"
//                 data={userMentions}
//                 markup={'@[__display__]'}
//                 renderSuggestion={(suggestion, search)=> (
//                   <div
//                   style={{ color: 'red' }}
//                   >
//                     {suggestion.display}
//                   </div>
//                 )}
//              />
//             </MentionsInput>            
//           </div> 

//           <div className="form-group mb-3">
//             <label className="fw-bold fs-4 mb-1" htmlFor="image">Image</label>
//             <input 
//               className="form-control"
//               type="file" 
//               name="image" 
//               onChange={handleImageChange} 
//               accept=".jpg,.jpeg,.png"                        
//             />
//           </div>

//           <button className="btn btn-warning mt-3" type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };


// export default AddPost;



///////////////////////React Quill///////////////////////////////

/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Add css for snow theme
import  'quill-mention';

const AddPost = () => {
  const [users, setUsers] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [userMentions, setUserMentions] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user");
        const userData = res.data.users;
        setUsers(userData);
        console.log(users, "users")
  
        if (userData.length > 0) {
          const mentions = userData.map((myUser) => ({
            id: myUser._id,
            value: myUser.name,
          }));
          setUserMentions(mentions);
          setIsDataFetched(true);
          console.log(mentions, "userMentions");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchUsers();
  }, []);
  
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (value) => {
    setInputs((prevState) => ({ ...prevState, description: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setInputs((prevState) => ({ ...prevState, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("description", editor.current.getEditor().getText()); // Get the plain text content
    formData.append("user", localStorage.getItem("userId"));
    if (inputs.image) {
      formData.append("image", inputs.image);
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/post/add",
        formData,
        config
      );
      console.log(res.data);
      navigate("/posts/");
    } catch (error) {
      console.log(error);
    }
  };


  const editor = useRef();

  const modules = useMemo(() => {
    if (!isDataFetched || userMentions.length === 0) {
      return {};
    }

    return {
      toolbar: [
        ["bold", "italic", "underline"],
        ["clean"],
      ],
      mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        mentionDenotationChars: ["@", "#"],
        source: function (searchTerm, renderList, mentionChar) {
          let values;

          if (mentionChar === "@") {
            values = userMentions;
          } else {
            values = [];
          }

          if (searchTerm.length === 0) {
            renderList(values, searchTerm);
          } else {
            const matches = values.filter((mention) =>
              mention.value.toLowerCase().includes(searchTerm.toLowerCase())
            );
            renderList(matches, searchTerm);
          }
        },
      },
    };
  }, [isDataFetched]);

  return (
    
    <div>
      {isDataFetched  ? (
        <form onSubmit={handleSubmit}>
          <div className="border border-dark rounded-3 p-3 m-3 w-75 mx-auto">
            <h2 className="text-center text-secondary fw-bold mb-3">Post</h2>

            <div className="form-group">
              <label className="fw-bold fs-4 mb-1" htmlFor="description">Description</label>
              <ReactQuill
                className="form-control" // Add the form-control class
                value={inputs.description}
                onChange={handleChange}
                ref={editor}
                modules={modules}
                placeholder="Enter description"
              />
            </div>
            <div className="form-group mb-3">
              <label className="fw-bold fs-4 mb-1" htmlFor="image">Image</label>
              <input
                className="form-control"
                type="file"
                name="image"
                onChange={handleImageChange}
                accept=".jpg,.jpeg,.png"
              />
            </div>
           <button className="btn btn-warning mt-3" type="submit">Submit</button>
          </div>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default AddPost;


