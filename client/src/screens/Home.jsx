import './css/Home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [users, setUsers] = useState([]);
    const [pseudo, setPseudo] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validated, setValidated] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8000/getUsers')
            .then(response => {
                setUsers(response.data);
                // console.log(response.data);

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
                        <p>utilisateur {user.id} : {user.firstName} {user.lastName}</p>
                    </div>
                ))
            }
            <form
                onSubmit={(e) => {
                    if (confirmPassword !== password) {
                        alert("Mot de passe différent");
                    } else {
                        e.preventDefault();
                        setError("");
                        try {
                            axios.post('http://localhost:8000/createUser', {
                                pseudo,
                                mail,
                                password
                            });
                            setValidated("compte créé")
                        } catch (err) {
                            console.error(err);
                            setError("L'un des champs de formulaire est invalide !");
                        }
                    }
                }}
            >
                <div className='formulaire'>
                    <label htmlFor="pseudo">
                        <p>Pseudo : </p>
                        <input
                            type="pseudo"
                            id="pseudo"
                            name="pseudo"
                            value={pseudo}
                            onChange={(e) => setPseudo(e.target.value)}
                        />
                    </label>
                    <label htmlFor="mail">
                        <p>mail : </p>
                        <input
                            type="mail"
                            id="mail"
                            name="mail"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                        />
                    </label>
                    <label htmlFor="password">
                        <p>password : </p>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label htmlFor="confirmPassword">
                        <p>Confirmez votre mot de passe : </p>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                    <div className='submit-button'>
                        <button className='button-normal'>S’inscrire</button>
                    </div>
                </div>
            </form>
            <p>{validated}</p>
        </div>
    );
}

export default Home;