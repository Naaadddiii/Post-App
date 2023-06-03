import axios from 'axios';

export const handleLike = async (id, setLikes, setLiked) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(`http://localhost:5000/api/post/${id}/like`, {}, config);
  const data = await res.data;
  setLikes(data.likes);
  setLiked(true);
};

export const handleUnlike = async (id, setLikes, setLiked) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(`http://localhost:5000/api/post/${id}/unlike`, {}, config);
  const data = await res.data;
  setLikes(data.likes);
  setLiked(false);
};
