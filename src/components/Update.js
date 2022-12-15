import React, {useEffect,useState} from "react";

const Update = ({posts, setPosts, postId, setPostId}) =>{
    const [title, setTitle] = useState([]);
    const [body, setBody] = useState([]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('title, body: ', title, body);
        console.log('postId: ', postId);
        const response = await fetch(`https://jsonplace-univclone.herokuapp.com/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'Application/json',
            },
            body: JSON.stringify({
                title,
                body,
            })  
    });
    const data = await response.json();
    console.log('data: ', data);
    if(data && data.title) {
        const newPosts = posts.map(post => {
            if(post.id === postId) {
                return data;
            } else {
                return post;
            }
        });
        setPosts(newPosts);
        setTitle('');
        setBody('');
        setPostId(null);
    }
    }
    return <>
    <h3>
        Update a Post
    </h3>
    <form onSubmit={handleSubmit}>
        <input type="text"
        placeholder="title" value={title} onChange=
        {(ev) => setTitle(ev.target.value)}></input>
        <input type="text" placeholder="body" value=
        {body} onChange={(ev) => setBody(ev.target.
        value)}></input>
        <button type="submit" className="btnbtn-outline-primary">Submit</button>
    </form>
    </>
};

export default Update;
