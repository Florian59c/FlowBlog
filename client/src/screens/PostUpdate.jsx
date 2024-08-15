import { Link, useLocation, useNavigate } from 'react-router-dom';
import './css/PostUpdate.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PostUpdate() {
    const navigate = useNavigate();
    const [currentUserId, setCurrentUserId] = useState(0);
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [intro, setIntro] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errorDelete, setErrorDelete] = useState("");
    const [confirmDelete, setConfirmDelete] = useState("");

    async function findPost() {
        const post = await axios.post('http://localhost:8000/findPost', {
            id: postId
        });
        setPost(post.data);
        setTitle(post.data.title);
        setIntro(post.data.intro);
        setContent(post.data.content);
    };

    useEffect(() => {
        const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
        if (currentUserId !== 0) {
            setCurrentUserId(currentUserId);
        }

        findPost();
    }, []);

    const location = useLocation();
    const { postId } = location.state || {};

    async function deletePost(e) {
        try {
            e.preventDefault();
            setConfirmDelete("");
            setErrorDelete("");
            const isDeleted = await axios.post('http://localhost:8000/deletePost', {
                currentUserId,
                postId
            });
            if (isDeleted) {
                setConfirmDelete("le post a été supprimé");
                navigate("/post-list");
            } else {
                setErrorDelete("une erreur est survenue lors de la suppression du post")
            }
        } catch (err) {
            console.error(err);
            setError("un problème est survenu");
        }
    };


    return (
        <div>
            {postId ?
                <div>
                    userid : {currentUserId}
                    postid : {postId}
                    post : {post.title}
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setConfirm("");
                            setError("");
                            try {
                                if (title !== "" || intro !== "" || content !== "") {
                                    const updatedPost = await axios.post('http://localhost:8000/updatePost', {
                                        currentUserId,
                                        postId,
                                        title,
                                        intro,
                                        content
                                    });
                                    if (updatedPost) {
                                        setConfirm("Le post à bien été modifié");
                                    } else {
                                        setError("Vous n'avez pas la permission pour modifier ce post");
                                    }
                                } else {
                                    setError("Vous devez remplir tout les formulaires");
                                }
                            } catch (err) {
                                console.error(err);
                                setError("un problème est survenu");
                            }
                        }}
                    >
                        <div>
                            <label htmlFor="title">
                                <p>titre : </p>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>
                            <label htmlFor="intro">
                                <p>Chapô : </p>
                                <input
                                    type="text"
                                    id="intro"
                                    name="intro"
                                    value={intro}
                                    onChange={(e) => setIntro(e.target.value)}
                                />
                            </label>
                            <label htmlFor="content">
                                <p>contenu : </p>
                                <input
                                    type="text"
                                    id="content"
                                    name="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </label>
                            <div>
                                <button>Modifier le post</button>
                            </div>
                            {error}
                            {confirm}
                        </div>
                    </form>
                    <div>
                        <button
                            onClick={deletePost}
                        >
                            Supprimer le post
                        </button>
                        {confirmDelete}
                        {errorDelete}
                    </div>
                </div>
                :
                <div>
                    <p>Impossible de trouver le post que vous voulez modifier</p>
                    <Link to="/">
                        <button>Retourner à la page d'accueil</button>
                    </Link>
                </div>
            }

        </div>
    );
}

export default PostUpdate;