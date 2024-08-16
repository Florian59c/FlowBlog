import './css/Home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import photo from '../assets/img/photo.png';
import Footer from '../components/Footer';

function Home() {
    const [currentUserId, setCurrentUserId] = useState(0);
    const [currentUser, setCurrentUser] = useState({});

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
                    const currentUser = await axios.post('http://localhost:8000/findUser', {
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
        <div>
            <section class="py-5">
                <div class="container overflow-hidden bsb-author-1">
                    <div class="row justify-content-center gy-4 gy-md-0">
                        <div class="col-12 col-md-3 col-xl-2 d-flex align-items-center justify-content-center">
                            <img class="img-fluid rounded-circle author-avatar" loading="lazy" src={photo} alt="Elio Evander" />
                        </div>
                        <div class="col-12 col-md-8 col-lg-6 col-xl-5 d-flex align-items-center justify-content-center">
                            <div class="text-center text-md-start author-content">
                                <h2 class="fs-2 mb-3">Florian Cagnon</h2>
                                <p class="mb-3">Diplômé dans le domaine du développement web et passionné par les nouvelles technologies, j'ai toujours été animé par la création d'applications innovantes et l'atteinte d'objectifs ambitieux.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container overflow-hidden bsb-author-1">
                    <div class="d-grid my-3" className='button-container'>
                        {currentUserId !== 0 ?
                            <div className='button'>
                                <button class="btn btn-primary btn-lg w-100" type="submit"
                                    onClick={async () => {
                                        localStorage.removeItem('currentUserId');
                                        setCurrentUserId(0)
                                    }}
                                >
                                    se déconnecter
                                </button>
                            </div>
                            :
                            <div className='button'>
                                <Link to="/login">
                                    <button class="btn btn-primary btn-lg w-100" type="submit">se connecter</button>
                                </Link>
                            </div>
                        }
                        <div className='button'>
                            <Link to="/post-list" className='button'>
                                <button class="btn btn-primary btn-lg w-100" type="submit">Accéder au posts</button>
                            </Link>
                        </div>
                        {currentUser?.role === "ADMIN" &&
                            <div className='button'>
                                <Link to="/post-add" className='button'>
                                    <button class="btn btn-primary btn-lg w-100" type="submit">Ajouter un post</button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
                <div>
                    {/* le formulaire d'envoie de mail ici */}
                </div>
            </section>
            <Footer currentUserRole={currentUser?.role} />
        </div>
    );
}

export default Home;