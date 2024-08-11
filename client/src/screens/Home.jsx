import './css/Home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [users, setUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState("");

    useEffect(() => {
        const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
        if (currentUserId) {
            setCurrentUserId(currentUserId);
        }
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/getAllUsers')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <p>test connexion avec symfony et la bdd :</p>
            {
                users.map(user => (
                    <div key={user.id}>
                        <p>utilisateur {user.id} : {user.pseudo}</p>
                    </div>
                ))
            }
            {currentUserId ?
                <button
                    onClick={async () => {
                        localStorage.removeItem('currentUserId');
                        setCurrentUserId("")
                    }}
                >
                    se déconnecter
                </button>
                :
                <Link to="/login" >
                    <button>se connecter</button>
                </Link>
            }
            {currentUserId}
        </div>
    );
}

export default Home;