import './css/Home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
            <div>
                {currentUserId !== 0 ?
                    <button
                        onClick={async () => {
                            localStorage.removeItem('currentUserId');
                            setCurrentUserId(0)
                        }}
                    >
                        se déconnecter
                    </button>
                    :
                    <Link to="/login" >
                        <button>se connecter</button>
                    </Link>
                }
            </div>
            <Link to="/post-list">
                <button>Accéder au posts</button>
            </Link>
            {currentUser?.role === "ADMIN" ?
                <div>
                    <Link to="/post-add">
                        <button>Ajouter un post</button>
                    </Link>
                </div>
                :
                ""
            }
            {currentUser?.role === "ADMIN" ?
                <div>
                    <Link to="/admin-page">
                        <p>Gestion Administrateur</p>
                    </Link>
                </div>
                :
                ""
            }
        </div>
    );
}

export default Home;