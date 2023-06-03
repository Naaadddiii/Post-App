
import express from 'express';
import multer from 'multer';
import { auth } from '../middleware/auth';
import {
  addComment,
  addLike,
  addPost,
  deleteComment,
  deletePost,
  editComment,
  getAllComments,
  getAllPost,
  getById,
  getByUserId,
  removeLike,
  updatePost
} from '../controllers/post-controller';

const postRouter = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

// Configure multer file filter
const fileFilter = function(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Set up Multer middleware for handling file uploads
const upload = multer({ storage: storage, fileFilter: fileFilter });

postRouter.get('/',auth, getAllPost);
postRouter.post('/add',auth, upload.single('image'), addPost);
postRouter.put('/update/:id', upload.single('image'), updatePost);
postRouter.get('/:id',auth, getById);
postRouter.delete('/:id',auth, deletePost);
postRouter.get('/user/:id',auth, getByUserId);
postRouter.post('/:id/like', auth, addLike);
postRouter.post('/:id/unlike', auth, removeLike);
postRouter.post('/:id/comment', auth, addComment);
postRouter.get('/:id/comments',auth, getAllComments);
postRouter.put('/:id/comment/:commentId', auth, editComment);
postRouter.delete('/:id/comment/:commentId', auth, deleteComment);


export default postRouter;

