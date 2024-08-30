import { Link, useParams } from 'react-router-dom';
import './css/ConfirmEmail.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ConfirmEmail() {
    const [verify, setVerify] = useState("Vérification en cours, Veuillez patienter...");

    const { id } = useParams();
    const userId = parseInt(id);

    async function test() {
        const verifyUser = await axios.post('/verifyUser', {
            id: userId
        });
        setVerify(verifyUser.data);
    }

    useEffect(() => {
        test();
    }, []);

    return (
        <div>
            <section class="py-3 py-md-5 mt-5 d-flex justify-content-center align-items-center">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="text-center">
                                <h3 class="h2 mb-5">{verify}</h3>
                                <Link to="/">
                                    <button class="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0">Retourner à la page d'acceuil</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <p></p>
        </div>
    )
}

export default ConfirmEmail;