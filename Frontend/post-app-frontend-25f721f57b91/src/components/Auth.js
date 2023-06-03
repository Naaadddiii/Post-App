import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const Auth = () => {
  
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = 'login') => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((error) => console.log(error));

    const data = await res.data;
    console.log(data);
    return data;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      const data = isSignup
        ? await sendRequest('signup')
        : await sendRequest();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user._id);
      dispatch(authActions.login());
      if (isSignup) {
        navigate('/auth');
      } else {
        navigate('/posts');
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <Container>
        <Form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center justify-content-center p-3 mt-5 rounded"
          style={{ boxShadow: '10px 10px 20px #ccc' }}
        >
          <h2 className="text-center">{isSignup ? 'Signup' : 'Login'}</h2>
          {isSignup && (
            <Form.Group className="mb-3 w-75">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                onChange={handleChange}
                value={inputs.name}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3 w-75">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              onChange={handleChange}
              value={inputs.email}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3 w-75">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              onChange={handleChange}
              value={inputs.password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            type="submit"
            variant="warning"
            className="w-75 my-3"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            variant="secondary"
            className="w-75"
          >
            Change to {isSignup ? 'Login' : 'Signup'}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Auth;
