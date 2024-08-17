import { Link, useParams } from 'react-router-dom';
import './css/PostDetail.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import photo from '../assets/img/photo.png';

function PostDetail() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    const [commentField, setCommentField] = useState("");
    const [error, setError] = useState("");
    const [confirm, setConfirm] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

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

        if (findPostWithUrl) {
            const splitDate = findPostWithUrl.last_date.split('T')[0].split('-');
            const day = splitDate[2];
            const month = splitDate[1];
            const year = splitDate[0];
            const splitTime = findPostWithUrl.last_date.split('T')[1].split('+')[0].split(':');
            const hour = splitTime[0];
            const minute = splitTime[1];

            setDate(day + "/" + month + "/" + year);
            setTime(hour + "h" + minute);
        }
    }, [findPostWithUrl]);

    return (
        <div>
            {findPostWithUrl !== undefined ?
                <div className='post-detail'>
                    <h1 className='title'>{findPostWithUrl.title}</h1>
                    <h2 className='intro'>{findPostWithUrl.intro}</h2>
                    <div className='author'>
                        <div>
                            <img class=" rounded-circle" id='photo' loading="lazy" src={photo} alt="Florian Cagnon" />
                        </div>
                        <div className='author-div'>
                            <div className='author-info'>
                                <h4>{findPostWithUrl.author.pseudo}</h4>
                                <p>Dernière mise à jour : {date} à {time}</p>
                            </div>
                        </div>
                    </div>
                    <p className='content'>{findPostWithUrl.content}</p>
                    <div>
                        {currentUser?.role === "ADMIN" && currentUser?.id === findPostWithUrl.author.id ?
                            <div className='button'>
                                <Link to={`/post-update`}
                                    state={{ postId: findPostWithUrl.id }}>
                                    <button class="btn btn-primary btn-lg w-100">modifier le post</button>
                                </Link>
                            </div>
                            :
                            ""
                        }
                    </div>
                    <div>
                        <p className='comment-title'>Poster un commentaire.</p>
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
                                <div class="col-12">
                                    <div class="form-floating mb-3">
                                        <textarea
                                            type="text"
                                            class="form-control"
                                            name="content"
                                            id="content"
                                            placeholder="Contenu"
                                            value={commentField}
                                            onChange={(e) => setCommentField(e.target.value)}
                                        />
                                        <label for="email" class="form-label">Poster un commentaire</label>
                                    </div>
                                </div>
                                <div class="my-3 text-end">
                                    <button class="btn btn-primary btn-lg" type="submit">Soumettre un commentaire</button>
                                </div>
                                <div className='confirm-message'>
                                    {confirm}
                                </div>
                                <div className='error-message'>
                                    {error}
                                </div>
                            </div>
                        </form>
                        <div class="container overflow-hidden py-3">
                            <div class="row gy-3 gy-lg-4">
                                {comments.map(comment => {
                                    return (
                                        <div key={comment.id} class="card">
                                            <div class="card-body">
                                                <p class="text-secondary fw-light fst-italic mb-3 fs-6">Commentaire de @{comment.userId.pseudo}</p>
                                                <p class="mb-3 mx-3 text-left text-xl-left fs-4">{comment.content}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className='unexist'>
                    <h1 className='mt-3'>Le post que vous cherchez n'existe pas</h1>
                    <Link to="/post-list">
                        <button class="btn btn-primary btn-lg mt-3">Retour à la liste des posts</button>
                    </Link>
                </div>
            }
        </div >
    );
}

export default PostDetail;