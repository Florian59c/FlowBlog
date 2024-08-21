import axios from 'axios';
import './css/AdminPage.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AdminPage() {
    const [comments, setComments] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(0);
    const [error, setError] = useState("");
    const [confirm, setConfirm] = useState("");

    async function findNotValidatedComments() {
        const comments = await axios.get('/findValidatedComments');
        setComments(comments.data);
    };

    async function validateComment(e) {

    }

    useEffect(() => {
        const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
        if (currentUserId !== 0) {
            setCurrentUserId(currentUserId);
        }

        findNotValidatedComments();
    }, [comments]);

    return (
        <section class="py-3">
            <div class="container overflow-hidden py-3">
                <div class="row gy-3 gy-lg-4">
                    {comments.map(comment => {
                        return (
                            <div key={comment.id} class="card">
                                <div class="card-body">
                                    <p class="text-secondary fw-light fst-italic mb-3 fs-6">Commentaire de @{comment.userId.pseudo}</p>
                                    <p class="mb-3 mx-3 text-left text-xl-left fs-4">{comment.content}</p>
                                </div>
                                <div className='button-container'>
                                    <button
                                        class="btn btn-primary btn-lg w-100 mb-3"
                                        onClick={
                                            async (e) => {
                                                try {
                                                    e.preventDefault();
                                                    await axios.post('/validateComment', {
                                                        currentUserId,
                                                        commentId: comment.id
                                                    });
                                                } catch (err) {
                                                    console.error(err);
                                                    setError("un problème est survenu");
                                                }
                                            }}
                                    >
                                        Valider le commentaire
                                    </button>
                                    <button
                                        class="btn btn-danger btn-lg w-100 mb-3"
                                        onClick={
                                            async (e) => {
                                                try {
                                                    e.preventDefault();
                                                    await axios.post('/deleteComment', {
                                                        currentUserId,
                                                        commentId: comment.id
                                                    });
                                                } catch (err) {
                                                    console.error(err);
                                                    setError("un problème est survenu");
                                                }
                                            }}
                                    >
                                        Supprimer le commentaire
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}

export default AdminPage;