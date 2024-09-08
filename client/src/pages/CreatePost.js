import {useState} from 'react' 
import 'react-quill/dist/quill.snow.css' //styling for the reactquill test editor
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';



export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const [redirect, setRedirect] = useState(null);

    async function createNewPost(ev){
        ev.preventDefault();

        if (!files || files.length === 0) {
            alert("Please add a file before submitting the post.");
            return;  
        }
        
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        })

        if(response.ok) {
            const result = await response.json();
            setRedirect(`/post/${result._id}`);
        }
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return (
        <form onSubmit={createNewPost}>
            <input 
                type="title" 
                placeholder="Title" 
                value={title}
                onChange={ev => setTitle(ev.target.value)}
                />
            <input 
                type="summary" 
                placeholder="Summary"
                value={summary}
                onChange={ev => setSummary(ev.target.value)}
                />
            <input 
                type="file" 
                onChange={ev => setFiles(ev.target.files)}
                />
            <Editor 
                onChange={setContent} 
                value={content}
                />
            <button type='submit' style={{marginTop:'5px'}}>Create Post</button>
        </form>
    )
}