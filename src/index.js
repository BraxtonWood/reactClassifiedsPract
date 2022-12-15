import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
/* CRUD applications
C- Create
R- Read
U - Update
D - Delete/destroy
*/


//import './style.css';
import Create from './components/Create';
import Update from './components/Update';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState(null);
    //console.log('posts', posts);

    const handleDelete = async (postIdToDelete) =>{
        const response = await fetch(`https://jsonplace-univclone.herokuapp.com/posts/${postIdToDelete}`, {
            method: 'DELETE',
        });
    const data = await response.json();
    console.log('data', data);
    if(data) {
        const newPosts = posts.filter(post => post.id !==postIdToDelete);
        setPosts(newPosts);
    }
    }
    useState(() => {
        const fetchPosts = async () => {
            const response = await fetch('https://jsonplace-univclone.herokuapp.com/posts');
            //console.log('response:',response);
            const data = await response.json();
            //console.log('data',data);
            setPosts(data);
        }
        fetchPosts();
    }, [])

    return <>
   
    <h1>
        Posts
    </h1>
    {
        postId
            ? <Update posts={posts} setPosts={setPosts} postId={postId}
            setPostId={setPostId}/>
            : <Create posts={posts} setPosts={setPosts}/>
    }
    {
        posts.map(post => <div key={post.id}>
            <h3>{post.title}</h3>
            <div>{post.body}</div>
            <button type="button"
            className="btn btn-outline-primary"
            onClick={() => {
                
                setPostId(post.id),
                console.log('edit button clicked post.id:', post.id)}
            }
            >Edit</button>
            <button type="button"
            className="btn btn-outline-danger"
            onClick={() => {
                
                handleDelete(post.id);
            }}
            >Delete</button>

        </div>)
    }
    </>
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
    
)







