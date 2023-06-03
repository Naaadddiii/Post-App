
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const PostDetail = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const id = useParams().id;
  console.log(id, "3333")

  const [inputs, setInputs] = useState({});
  const [existingImage, setExistingImage] = useState('');

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleImageChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      image: e.target.files[0]
    }));
  };
  

  const fetchDetails = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    console.log(id,"44444")
    const res = await axios.get(`http://localhost:5000/api/post/${id}`, config).catch((error) => console.log(error));
    console.log(res, "11111")    
    const data = await res.data;
    console.log(data, "2222222")
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setPost(data.post);
      setExistingImage(data.post.image || '');
      setInputs({ 
        description: data.post.description || '',
        image: null
      });
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate('/posts/'));
  };

  const sendRequest = async () => {
    const formData = new FormData();
    formData.append('description', inputs.description);
    if (inputs.image) {
      formData.append('image', inputs.image);
    } else {
      formData.append('image', existingImage);
    }
    const token = localStorage.getItem('token');
    const res = await axios
      .put(`http://localhost:5000/api/post/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
        
      })
      
      .catch((error) => console.log(error));

    const data = await res.data;
    return data;
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="border border-dark rounded-3 p-3 m-3 w-75 mx-auto">
          <h2 className="text-center text-secondary fw-bold mb-3">Post</h2>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label className="fw-bold fs-4 mb-1">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="description"
              value={inputs.description}
              onChange={handleChange}
              placeholder="Enter description"         
            />
          </Form.Group>


           <Form.Group className="mb-3" controlId="image">
               <Form.Label className="fw-bold fs-4 mb-1">Updated Image:</Form.Label>
                 <div className="input-group">
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={handleImageChange}
                    accept=".jpg,.jpeg,.png"
                  />
                 </div>
          </Form.Group>
          <p className="fw-bold">Current Image: {existingImage}</p>
          <Button className="mt-3" variant="warning" type="submit">
            Update Post
          </Button>
        </div>
      </Form>
     </div>
  )
};

export default PostDetail;





