import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {format} from 'date-fns';

export default function PostPage(){
    const [postContent, setPostContent] = useState(null);
    
    const {id} = useParams(); 
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
        .then(response => {
            response.json()
            .then(content => {
                setPostContent(content);
            })
        })
    }, []);

    if(!postContent){
        return '';
    }

    return (
        <div className="post-page">
            <div className="image">
                <img src={`http://localhost:4000/${postContent.cover}`} alt=""></img>
            </div>
            <h1>{postContent.title}</h1>
            <time>{format(new Date(postContent.createdAt), 'MMMM dd, yyyy HH:mm:ss')}</time>
            <div className="author">by @{postContent.author.username}</div>
            <div className="content" dangerouslySetInnerHTML={{__html:postContent.content}} />
        
        </div>
        
    );
}