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

            <section class="bg-light py-3 py-md-5">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                            <div class="card border border-light-subtle rounded-3 shadow-sm">
                                <div class="card-body p-3 p-md-4 p-xl-5">
                                    <h2 class="fs-6 fw-normal text-center text-secondary mb-4">Entrez vos informations de compte</h2>
                                    <form
                                        onSubmit={async (e) => {
                                            if (confirmPassword !== password) {
                                                alert("Mot de passe différent");
                                            } else {
                                                e.preventDefault();
                                                setError("");
                                                try {
                                                    if (pseudo === "" || mail === "" || password === "") {
                                                        setError("Vous devez remplir tout les champs du formulaire !")
                                                    } else {
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
                                                    }
                                                } catch (err) {
                                                    console.error(err);
                                                    setError("un problème est survenu");
                                                }
                                            }
                                        }}
                                    >
                                        <div class="row gy-2 overflow-hidden">
                                            <div class="col-12">
                                                <div class="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name="pseudo"
                                                        id="pseudo"
                                                        placeholder="Pseudo"
                                                        value={pseudo}
                                                        onChange={(e) => setPseudo(e.target.value)}
                                                    />
                                                    <label for="firstName" class="form-label">Pseudo</label>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-floating mb-3">
                                                    <input
                                                        type="email"
                                                        class="form-control"
                                                        name="mail"
                                                        id="mail"
                                                        placeholder="mail"
                                                        value={mail}
                                                        onChange={(e) => setMail(e.target.value)}
                                                    />
                                                    <label for="lastName" class="form-label">Adresse mail</label>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-floating mb-3">
                                                    <input
                                                        type="password"
                                                        class="form-control"
                                                        name="password"
                                                        id="password"
                                                        placeholder="Mot de passe"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <label for="email" class="form-label">Mot de passe</label>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-floating mb-3">
                                                    <input
                                                        type="password"
                                                        class="form-control"
                                                        name="confirmPassword"
                                                        id="confirmPassword"
                                                        placeholder="Confirmer le mot de passe"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                    />
                                                    <label for="password" class="form-label">Confirmer le mot de passe</label>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                            </div>
                                            <div class="col-12">
                                                <div class="d-grid my-3">
                                                    <button class="btn btn-primary btn-lg" type="submit">S’inscrire</button>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <p class="m-0 text-secondary text-center">Vous avez déjà un compte ?
                                                    <Link to="/login">
                                                        <p class="link-primary text-decoration-none">Se connecter</p>
                                                    </Link>
                                                </p>
                                            </div>

                                            <div>
                                                {error}
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Register;