import { env } from "../env.js";

export const savePost = async (post) => {
    return await fetch(`${env.API_URL}/post`, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => json);   
}

export const savePhoto = async (image, id) => {
    const formData = new FormData();
    formData.append('image', image);
    return await fetch(`${env.API_URL}/image/${id}`, {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

export const getPosts = async () => {
    return await fetch(`${env.API_URL}/post`)
        .then((response) => response.json())
        .then((json) => json);
}

export const getPhoto = async (id) => {
    return await fetch(`${env.API_URL}/image/${id}`)
        .then((response) => response.json())
        // .then((blob) => URL.createObjectURL(blob));
}