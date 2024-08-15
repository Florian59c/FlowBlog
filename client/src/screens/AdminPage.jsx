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
        const comments = await axios.get('http://localhost:8000/findValidatedComments');
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
        <div>
            <div>
                {comments.map(comment => {
                    return (
                        <div>
                            <div>
                                <p>auteur : {comment.userId.pseudo}</p>
                                <p>commentaire : {comment.content}</p>
                            </div>
                            <div>
                                <button
                                    onClick={
                                        async (e) => {
                                            try {
                                                e.preventDefault();
                                                await axios.post('http://localhost:8000/validateComment', {
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
                                    onClick={
                                        async (e) => {
                                            try {
                                                e.preventDefault();
                                                await axios.post('http://localhost:8000/deleteComment', {
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
            <Link to="/">
                <button>Retourner à la page d'acceuil</button>
            </Link>
        </div>
    );
}

export default AdminPage;