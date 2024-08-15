import axios from 'axios';
import './css/PostList.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function findPosts() {
            const posts = await axios.get('http://localhost:8000/getPostsWithRecentDate');
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
            <Link to={`/post-detail/${post.id}`}>
                <div key={post.id} className='post'>
                    <p>{post.title}</p>
                    <p>{post.intro}</p>
                    <p>Dernière modification le {date} à {time}</p>
                </div>
            </Link>
        )
    });

    return (
        <div>
            <div>
                {postList}
            </div>
        </div>
    );
}

export default PostList;