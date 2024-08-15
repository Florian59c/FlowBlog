import axios from 'axios';
import './css/PostAdd.css';
import React, { useEffect, useState } from 'react';

function PostAdd() {
    const [currentUserId, setCurrentUserId] = useState(0);
    const [title, setTitle] = useState("");
    const [intro, setIntro] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
        if (currentUserId !== 0) {
            setCurrentUserId(currentUserId);
        }
    }, []);

    return (
        <div>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    setMessage("");
                    setError("");
                    try {
                        if (title !== "" && intro !== "" && content !== "") {
                            const createdPost = await axios.post('http://localhost:8000/createPost', {
                                currentUserId,
                                title,
                                intro,
                                content
                            });
                            if (createdPost) {
                                setMessage("Le post à bien été créé");
                            } else {
                                setError("Vous n'avez pas la permission pour créer un post");
                            }
                        } else {
                            setError("Vous devez remplir tout les formulaires");
                        }
                    } catch (err) {
                        console.error(err);
                        setError("un problème est survenu");
                    }
                }
                }
            >
                <div>
                    <label htmlFor="title">
                        <p>title : </p>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <label htmlFor="intro">
                        <p>intro : </p>
                        <input
                            type="text"
                            id="intro"
                            name="intro"
                            value={intro}
                            onChange={(e) => setIntro(e.target.value)}
                        />
                    </label>
                    <label htmlFor="content">
                        <p>content : </p>
                        <input
                            type="text"
                            id="content"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </label>
                    <div className='submit-button'>
                        <button className='button-normal'>Créer le post</button>
                    </div>
                </div>
            </form>
            {message}
            {error}
        </div>
    );
}

export default PostAdd;