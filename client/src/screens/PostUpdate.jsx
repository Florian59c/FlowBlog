import { Link, useLocation, useNavigate } from 'react-router-dom';
import './css/PostUpdate.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PostUpdate() {
    const navigate = useNavigate();
    const [currentUserId, setCurrentUserId] = useState(0);
    const [title, setTitle] = useState("");
    const [intro, setIntro] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errorDelete, setErrorDelete] = useState("");
    const [confirmDelete, setConfirmDelete] = useState("");

    async function findPost() {
        const post = await axios.post('/findPost', {
            id: postId
        });
        setTitle(post.data?.title);
        setIntro(post.data?.intro);
        setContent(post.data?.content);
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
            const isDeleted = await axios.post('/deletePost', {
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
            setErrorDelete("un problème est survenu lors de la suppression");
        }
    };

    return (
        <div>
            {postId ?
                <section class="bg-light py-3 py-md-5">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-12 col-sm-20 col-md-16 col-lg-12 col-xl-12 col-xxl-10">
                                <div class="card border border-light-subtle rounded-3 shadow-sm">
                                    <div class="card-body p-3 p-md-4 p-xl-5">
                                        <h2 class="fs-6 fw-normal text-center text-secondary mb-4">Formulaire de modification d'un post</h2>
                                        <form
                                            onSubmit={async (e) => {
                                                e.preventDefault();
                                                setConfirm("");
                                                setError("");
                                                try {
                                                    if (title !== "" || intro !== "" || content !== "") {
                                                        const updatedPost = await axios.post('/updatePost', {
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
                                            <div class="row gy-2 overflow-hidden">
                                                <div class="col-12">
                                                    <div class="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            name="title"
                                                            id="title"
                                                            placeholder="Titre"
                                                            value={title}
                                                            onChange={(e) => setTitle(e.target.value)}
                                                        />
                                                        <label for="title" class="form-label">Titre</label>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            name="intro"
                                                            id="intro"
                                                            placeholder="Chapô"
                                                            value={intro}
                                                            onChange={(e) => setIntro(e.target.value)}
                                                        />
                                                        <label for="intro" class="form-label">Chapô</label>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="form-floating mb-3">
                                                        <textarea
                                                            type="text"
                                                            class="form-control"
                                                            name="content"
                                                            id="content"
                                                            placeholder="Contenu"
                                                            value={content}
                                                            onChange={(e) => setContent(e.target.value)}
                                                        />
                                                        <label for="content" class="form-label">Contenu</label>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="d-grid my-3">
                                                        <button class="btn btn-primary btn-lg" type="submit">Modifier le post</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <div className='confirm-message'>
                                            <p>{confirm}</p>
                                        </div>
                                        <div className='error-message'>
                                            <p>{error}</p>
                                        </div>
                                        <div class="col-12">
                                            <div class="d-grid my-3">
                                                <button
                                                    class="btn btn-danger btn-lg"
                                                    onClick={deletePost}
                                                >
                                                    Supprimer le post
                                                </button>
                                            </div>
                                        </div>
                                        <div className='confirm-message'>
                                            <p>{confirmDelete}</p>
                                        </div>
                                        <div className='error-message'>
                                            <p>{errorDelete}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <div className='unexist'>
                    <h1>Impossible de trouver le post que vous voulez modifier</h1>
                    <Link to="/">
                        <button class="btn btn-primary btn-lg mt-3">Retourner à la page d'accueil</button>
                    </Link>
                </div>
            }
        </div>
    );
}

export default PostUpdate;