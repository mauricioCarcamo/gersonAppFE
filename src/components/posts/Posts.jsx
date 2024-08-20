import "./posts.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import nothing from "../../../public/nothing.webp";
import { useEffect, useRef, useState } from "react";
import { getPhoto, getPosts } from "../../FackApis/Forms";
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [isComment, setIsComment] = useState(true);
    const [comment, setComment] = useState("");
    const commentInputRef = useRef(null);
  const handleLike = (e) => {
    const id = e.target.id;
    const data = {
      type: 13,
      idPost: id,
      author: user,
      dateMs: Date.now(),
    };
    fetch("http://localhost:3000/reaction", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      window.location.reload();
  }


  const saveComment = (e) => {
    e.preventDefault();
    if(comment === "") return;

    const data = {
      "body": comment,
      "idPost":e.target.id,
      "dateMs": Date.now(),
  }
    fetch("http://localhost:3000/comment", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      window.location.reload();
  }
  const hasUserLiked = (post) => {
    const isLiked = post.find(post => post.author === user);
    return isLiked
  };

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

        
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("auth"));
    setUser(user._id);
  }, []);
  return (
    <div className="posts-container">
      {posts.map((post, index) => (
        <div key={index} className="post">
          <div className="post-header">
            
            <img src={post?.image || (post?.images[0]?.path && `http://localhost:3000/${post?.images[0]?.path}`) || nothing} alt="Book cover" className="post-image" />
          </div>
          <div className="post-body">

          <div className="post-info">
            {/* <h2 className="post-author">{post}</h2> */}
            <p className="post-description">{post?.body}</p>
          </div>
          <div className="reactions-comments">
            <p>{post.reactions.length} Me gusta</p>
            <p>{post.comments.length} Comentarios</p>
          </div>
          <div className="post-actions" >
            <span className={`btn-action ${hasUserLiked(post.reactions) ? 'liked' : ''}`} id={post._id} onClick={handleLike}>
              <FavoriteBorderIcon id={post._id}/>
              
              <p id={post._id}>Me gusta</p>
            </span>

            <span className="btn-action" >
              <CommentRoundedIcon />
              <p>Comentar</p>
            </span>
          </div>
          {
            isComment && (
              <div className="post-comments">
                <input ref={commentInputRef} onChange={(e) => setComment(e.target.value)} type="text" placeholder="Escribe un comentario" required/>
                <button id={post._id} onClick={saveComment}>Enviar</button>
              </div>
            )
          }
          <div className="comments-container">
          {post.comments?.length === 0 ? (
              <p>No hay comentarios</p>
            ) : (
              post.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p className="comment-body">{comment.body}</p>
                </div>
              ))
            )}
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
