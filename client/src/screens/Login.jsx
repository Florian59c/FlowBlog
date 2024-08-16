import { Link, useNavigate } from 'react-router-dom';
import './css/Login.css';
import { useState } from 'react';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <section class="bg-light py-3 py-md-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div class="card border border-light-subtle rounded-3 shadow-sm">
                            <div class="card-body p-3 p-md-4 p-xl-5">
                                <h2 class="fs-6 fw-normal text-center text-secondary mb-4">Entrez vos identifiants pour vous connecter</h2>
                                <form action="#!"
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        setError("");
                                        try {
                                            const login = await axios.post('http://localhost:8000/login', {
                                                mail,
                                                password
                                            });
                                            if (login.data === "correct") {
                                                try {
                                                    const id = await axios.post('http://localhost:8000/findIdByMail', {
                                                        mail
                                                    });
                                                    localStorage.setItem('currentUserId', JSON.stringify(id.data));
                                                    navigate("/");
                                                } catch (error) {
                                                    console.error(error);
                                                }
                                            } else if (login.data === "errorMail") {
                                                setError("L'adresse mail est incorect !");
                                            } else {
                                                setError("Le mot de passe est incorect !");
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
                                                    type="email"
                                                    class="form-control"
                                                    id="mail"
                                                    name="mail"
                                                    placeholder="mail"
                                                    value={mail}
                                                    onChange={(e) => setMail(e.target.value)}
                                                />
                                                <label for="firstName" class="form-label">Adresse mail</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-floating mb-3">
                                                <input
                                                    type="password"
                                                    class="form-control"
                                                    id="password"
                                                    name="password"
                                                    placeholder="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <label for="lastName" class="form-label">Mot de passe</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="d-grid my-3">
                                                <button class="btn btn-primary btn-lg" type="submit">Se connecter</button>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <p class="m-0 text-secondary text-center">Vous n'avez pas de compte?
                                                <Link to="/register">
                                                    <p class="link-primary text-decoration-none">Se créer un compte</p>
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
                        <div className='return'>
                            <Link to="/" >
                                <p>Retouner à la page d'acceuil</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;