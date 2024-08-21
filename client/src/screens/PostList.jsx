import axios from 'axios';
import './css/PostList.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function findPosts() {
            const posts = await axios.get('/getPostsWithRecentDate');
            setPosts(posts.data);
        }
        findPosts();
    }, []);

    const postList = posts.map(post => {
        const splitDate = post.last_date.split('T')[0].split('-');
        const day = splitDate[2];
        const month = splitDate[1];
        const year = splitDate[0];
        const splitTime = post.last_date.split('T')[1].split('+')[0].split(':');
        const hour = splitTime[0];
        const minute = splitTime[1];
        const date = day + "/" + month + "/" + year;
        const time = hour + "h" + minute;
        return (
            <Link key={post.id} to={`/post-detail/${post.id}`} class="col-12 col-lg-6">
                <div class="card">
                    <div className='box'>
                        <div class="card-body">
                            <p class="text-secondary mb-3 text-center fw-bolder text-xl-left text-uppercase fs-5">{post.title}</p>
                            <p class="text-secondary mb-3 fs-5">{post.intro}</p>
                            <p class="text-secondary fw-light fst-italic fs-6">Ajouté le {date} à {time}</p>
                        </div>
                    </div>
                </div>
            </Link >
        )
    });

    return (
        <section class="py-3 py-md-5 py-xl-8">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-10 col-lg-8">
                        <h3 class="fs-4 mb-2 text-uppercase mb-3">Mes posts</h3>
                    </div>
                </div>
            </div>
            <div class="container overflow-hidden py-3">
                <div class="row gy-3 gy-lg-4">
                    {postList}
                </div>
            </div>
        </section>
    );
}

export default PostList;