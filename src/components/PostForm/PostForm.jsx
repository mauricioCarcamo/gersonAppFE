
import { useEffect, useState } from 'react';
import './postForm.css';
import { savePhoto, savePost } from '../../FackApis/Forms';

const PostForm = () => {
  const user = JSON.parse(localStorage.getItem('auth'));
  const [formData, setFormData] = useState({
    image: null,
    imageUrl: '',
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        image: file,
        imageUrl: imageUrl
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: null,
      imageUrl: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar los datos del formulario a savePost
      const postResponse = await savePost({
        author: user._id,
        body: formData.description,
        image: 'photo',
        dateMs: 1,
      });
      
      // Enviar la imagen a savePhoto con el ID del post creado
      if (formData.image && postResponse._id) {
        console.log('Uploading photo...');
        console.log('Post ID:', postResponse._id);
        const photoResponse = await savePhoto(formData.image, postResponse._id);
        console.log('Photo uploaded:', photoResponse);
        window.location = '/';
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/post");
        const data = await response.json();
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="image">Imagen:</label>
        <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} />
        {formData.imageUrl && (
          <div>
            <img src={formData.imageUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
            <button type="button" onClick={handleRemoveImage}>Borrar Imagen</button>
          </div>
        )}
      </div>
      <div>
        <label htmlFor="name">Nombre del Producto:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <button type="submit">Subir Producto</button>
    </form>
  );
};

export default PostForm;
  