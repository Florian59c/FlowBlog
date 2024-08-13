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
        <div>
            <form
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
                <div className='formulaire'>

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
                    <div className='submit-button'>
                        <button className='button-normal'>Se connecter</button>
                    </div>
                </div>
            </form>
            {error}

            <Link to="/register" >
                <p>Se créer un compte</p>
            </Link>
        </div >
    );
}

export default Login;