import { Link, useParams } from 'react-router-dom';
import './css/PostDetail.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PostDetail() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    const [commentField, setCommentField] = useState("");
    const [error, setError] = useState("");
    const [confirm, setConfirm] = useState("");

    async function findPosts() {
        const posts = await axios.get('http://localhost:8000/getPostsWithRecentDate');
        setPosts(posts.data);
    };

    useEffect(() => {
        const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
        if (currentUserId !== 0) {
            setCurrentUserId(currentUserId);
        }

        findPosts();
        findcomments();
    }, []);


    useEffect(() => {
        async function findCurrentUser() {
            if (currentUserId !== 0) {
                try {
                    const currentUser = await axios.post('http://localhost:8000/findUser', {
                        id: currentUserId
                    });
                    setCurrentUser(currentUser.data);
                } catch (error) {
                    console.error(error);
                }
            } else {
                setCurrentUser(0)
            }
        }
        findCurrentUser();
    }, [currentUserId]);

    const { url } = useParams();

    const findPostWithUrl = posts.find((post) => {
        return post.id === parseInt(url);
    });

    async function findcomments() {
        if (findPostWithUrl) {
            const comments = await axios.post('http://localhost:8000/findValidatedCommentsByPost', {
                postId: findPostWithUrl.id
            });
            setComments(comments.data);
        }
    };

    useEffect(() => {
        findcomments();
    }, [findPostWithUrl]);

    return (
        <div>
            {findPostWithUrl !== undefined ?
                <div>
                    <p>titre : {findPostWithUrl.title}</p>
                    <p>chapô : {findPostWithUrl.intro}</p>
                    <p>contenu : {findPostWithUrl.content}</p>
                    <p>date : {findPostWithUrl.last_date}</p>
                    <p>auteur du post : {findPostWithUrl.author.pseudo}</p>
                    {currentUser?.role === "ADMIN" && currentUser?.id === findPostWithUrl.author.id ?
                        <Link to="/post-update">
                            <button>modifier le post</button>
                        </Link>
                        :
                        ""
                    }
                    <form
                        onSubmit={async (e) => {
                            if (currentUserId !== 0) {
                                e.preventDefault();
                                setError("");
                                setConfirm("");
                                if (commentField === "") {
                                    setError("vous devez mettre écrire un commentaire pour pouvoir le soumettre")
                                } else {
                                    try {
                                        await axios.post('http://localhost:8000/createComment', {
                                            currentUserId,
                                            currentPostId: findPostWithUrl.id,
                                            content: commentField
                                        });
                                        setConfirm("le commentaire a bien été envoyé")
                                    } catch (err) {
                                        console.error(err);
                                        setError("un problème est survenulors de la soumission du commentaire");
                                    }
                                }
                            } else {
                                setError("Vous devez être connecté pour soumettre un commentaire !")
                            }
                        }}
                    >
                        <div>
                            <label htmlFor="commentField">
                                <p>commentaire : </p>
                                <input
                                    type="commentField"
                                    id="commentField"
                                    name="commentField"
                                    value={commentField}
                                    onChange={(e) => setCommentField(e.target.value)}
                                />
                            </label>
                            <div>
                                <button>Soumettre un commentaire</button>
                            </div>
                            {error}
                            {confirm}
                        </div>
                    </form>
                    <div>
                        {comments.map(comment => {
                            return (
                                <div>
                                    <p>auteur : {comment.userId.pseudo}</p>
                                    <p>commentaire : {comment.content}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                :
                <div>
                    <p>Le post que vous cherchez n'existe pas</p>
                    <Link to="/post-list">
                        <button>Retour à la liste des posts</button>
                    </Link>
                </div>
            }
        </div>
    );
}

export default PostDetail;