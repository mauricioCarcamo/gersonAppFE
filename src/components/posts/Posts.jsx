import "./posts.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";

import { useEffect, useState } from "react";
import { getPhoto, getPosts } from "../../FackApis/Forms";
const Posts = () => {
    const [posts, setPosts] = useState([]);
useEffect(() => {
    // Llamada a la API para obtener los posts
    getPosts()
      .then(async (response) => {
        const updatedPosts = await Promise.all(
          response.map(async (post) => {
            const photo = await getPhoto(post._id);
            const newPost = {
                ...post,
                image: photo?.path && `http://localhost:3000/${photo.path}`,
              }
            return newPost;
            
          })
        );
        (updatedPosts);
        console.log(updatedPosts);
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);
  
  return (
    <div className="posts-container">
      {posts.map((post, index) => (
        <div key={index} className="post">
          <div className="post-header">
            
            <img src={post?.image} alt="Book cover" className="post-image" />
          </div>
          <div className="post-body">

          <div className="post-info">
            <h2 className="post-author">{post?.author}</h2>
            <p className="post-description">{post?.body}</p>
          </div>
          <div className="post-actions">
            <span className="btn-action">
              <FavoriteBorderIcon />
              
              <p>Me gusta</p>
            </span>
            <span className="btn-action">
              <CommentRoundedIcon />
              <p>Comentar</p>
            </span>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
