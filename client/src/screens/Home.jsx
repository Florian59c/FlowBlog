import './css/Home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/getUser')
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

            <Link to="/login" >
                <button>se connecter</button>
            </Link>
        </div>
    );
}

export default Home;