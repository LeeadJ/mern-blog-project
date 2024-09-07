import Post from "../Components/Post";
import {useEffect, useState} from "react";

export default function HomePage(){
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('https://dailytech-backend.onrender.com/post').then(response => {
            response.json().then(respondPosts => {
                setPosts(respondPosts);
            })
        })
    }, [])
    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post key={post._id} {...post} />
            )    
            )}
            
        </>
    )
}