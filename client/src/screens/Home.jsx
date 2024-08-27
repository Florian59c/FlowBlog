import './css/Home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import photo from '../assets/img/photo.png';
import Footer from '../components/Footer';

function Home() {
    const [currentUserId, setCurrentUserId] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    const [text, setText] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
        if (currentUserId !== 0) {
            setCurrentUserId(currentUserId);
        }
    }, []);

    useEffect(() => {
        async function findCurrentUser() {
            if (currentUserId !== 0) {
                try {
                    const currentUser = await axios.post('/findUser', {
                        id: currentUserId
                    });
                    console.log(currentUser.data);

                    setCurrentUser(currentUser.data);
                } catch (error) {
                    console.error(error);
                }
            } else {
                setCurrentUser(0);
            }
        }
        findCurrentUser();
    }, [currentUserId]);

    return (
        <div className='home'>
            <section class="py-5">
                <div class="container overflow-hidden bsb-author-1">
                    <div class="row justify-content-center gy-4 gy-md-0">
                        <div class="col-2 d-flex align-items-center justify-content-center">
                            <img class="img-fluid rounded-circle" id='photo' loading="lazy" src={photo} alt="Florian Cagnon" />
                        </div>
                        <div class="col-10 d-flex align-items-center justify-content-center">
                            <div class="text-center text-md-start">
                                <h2 class="fs-2 mb-3">Florian Cagnon</h2>
                                <p class="mb-3">Diplômé dans le domaine du développement web et passionné par les nouvelles technologies, j'ai toujours été animé par la création d'applications innovantes et l'atteinte d'objectifs ambitieux.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container overflow-hidden bsb-author-1">
                    <div class="d-grid my-3" className='button-container'>
                        {currentUserId === 0 || currentUserId === undefined || currentUserId === null ?
                            <div>
                                <Link to="/login">
                                    <button class="btn btn-primary btn-lg w-100">se connecter</button>
                                </Link>
                            </div>
                            :
                            <div>
                                <button class="btn btn-primary btn-lg w-100"
                                    onClick={() => {
                                        localStorage.removeItem('currentUserId');
                                        setCurrentUserId(0);
                                    }}
                                >
                                    se déconnecter
                                </button>
                            </div>
                        }
                        <div >
                            <Link to="/post-list">
                                <button class="btn btn-primary btn-lg w-100">Accéder au posts</button>
                            </Link>
                        </div>
                        {currentUser?.role === "ADMIN" &&
                            <div>
                                <Link to="/post-add">
                                    <button class="btn btn-primary btn-lg w-100">Ajouter un post</button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
                <div class="mt-5">
                    <form
                        onSubmit={async (e) => {
                            if (currentUserId !== 0) {
                                e.preventDefault();
                                setConfirm("")
                                setError("");
                                try {
                                    const mailSend = await axios.post('/contactMail', {
                                        currentUserId,
                                        text
                                    });
                                    if (mailSend) {
                                        setConfirm("le mail a bien été envoyé")
                                    } else {
                                        setError("Seul les utilisateurs connectés peuvent envoyer un mail");
                                    }
                                } catch (err) {
                                    console.error(err);
                                    setError("un problème est survenu");
                                }
                            } else {
                                setError("Seul les utilisateurs connectés peuvent envoyer un mail");
                            }
                        }}
                    >
                        <div class="col-12">
                            <div class="form-floating mb-3">
                                <textarea
                                    type="text"
                                    class="form-control"
                                    name="text"
                                    id="content"
                                    placeholder="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                                <label for="text" class="form-label">Contenu du mail</label>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="d-grid my-3">
                                <button class="btn btn-primary btn-lg" type="submit">Envoyer le mail</button>
                            </div>
                        </div>
                        <div className='confirm-message'>
                            {confirm}
                        </div>
                        <div className='error-message'>
                            {error}
                        </div>
                    </form >
                </div>
            </section >
            <Footer currentUserRole={currentUser?.role} />
        </div >
    );
}

export default Home;