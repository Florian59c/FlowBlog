import axios from 'axios';
import './css/PostAdd.css';
import React, { useEffect, useState } from 'react';

function PostAdd() {
    const [currentUserId, setCurrentUserId] = useState(0);
    const [title, setTitle] = useState("");
    const [intro, setIntro] = useState("");
    const [content, setContent] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
        if (currentUserId !== 0) {
            setCurrentUserId(currentUserId);
        }
    }, []);

    return (
        <section class="bg-light py-3 py-md-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-sm-20 col-md-16 col-lg-12 col-xl-12 col-xxl-10">
                        <div class="card border border-light-subtle rounded-3 shadow-sm">
                            <div class="card-body p-3 p-md-4 p-xl-5">
                                <h2 class="fs-6 fw-normal text-center text-secondary mb-4">Formulaire de création d'un post</h2>
                                <form
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        setConfirm("");
                                        setError("");
                                        try {
                                            if (title !== "" || intro !== "" || content !== "") {
                                                const createdPost = await axios.post('/createPost', {
                                                    currentUserId,
                                                    title,
                                                    intro,
                                                    content
                                                });
                                                if (createdPost) {
                                                    setConfirm("Le post a bien été créé");
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
                                                <label for="firstName" class="form-label">Titre</label>
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
                                                <label for="lastName" class="form-label">Chapô</label>
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
                                                <label for="email" class="form-label">Contenu</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="d-grid my-3">
                                                <button class="btn btn-primary btn-lg" type="submit">Créer le post</button>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PostAdd;