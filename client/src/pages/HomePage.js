import Post from "../Components/Post";
import {useEffect, useState} from "react";

export default function HomePage(){
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/post').then(response => {
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