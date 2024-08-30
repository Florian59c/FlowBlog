import { useParams } from 'react-router-dom';
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
            <p>id : {userId}</p>
            <p>{verify}</p>
        </div>
    )
}

export default ConfirmEmail;