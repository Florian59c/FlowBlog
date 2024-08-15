import './css/Register.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [pseudo, setPseudo] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <div>
            <div>
                <form
                    onSubmit={async (e) => {
                        if (confirmPassword !== password) {
                            alert("Mot de passe différent");
                        } else {
                            e.preventDefault();
                            setError("");
                            try {
                                const isRegister = await axios.post('http://localhost:8000/createUser', {
                                    pseudo,
                                    mail,
                                    password
                                });
                                switch (isRegister.data) {
                                    case "error":
                                        setError("Le pseudo et l'email existe déjà");
                                        break;
                                    case "errorPseudo":
                                        setError("Le pseudo existe déjà");
                                        break;
                                    case "errorMail":
                                        setError("L'email existe déjà");
                                        break;
                                    default:
                                        const id = await axios.post('http://localhost:8000/findIdByMail', {
                                            mail
                                        });
                                        localStorage.setItem('currentUserId', JSON.stringify(id.data));
                                        navigate("/");
                                        break;
                                }
                            } catch (err) {
                                console.error(err);
                                setError("un problème est survenu");
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
                {error}
            </div>
            <Link to="/login">
                <p>Déjà un compte, me connecter</p>
            </Link>
        </div>
    );
}

export default Register;