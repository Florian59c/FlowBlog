import { useParams } from 'react-router-dom';
import './css/ConfirmEmail.css';
import React from 'react';

function ConfirmEmail() {

    const { id } = useParams();

    return (
        <div>
            <p>id : {id}</p>
        </div>
    )
}

export default ConfirmEmail;