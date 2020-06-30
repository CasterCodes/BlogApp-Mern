import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
const PostForm = (props) => {
  const [post, setPost] = useState({
    author: "",
    title: "",
    body: "",
  });
  const { current } = props;
  const { author, title, body } = post;
  useEffect(() => {
    if (current !== null) {
      setPost(current);
    } else {
      setPost({
        author: "",
        title: "",
        body: "",
      });
    }
  }, [current]);
  const onChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (author === "" || title === "" || body === "") {
      props.setAlert("Please fill in all the fields", "danger");
    } else if (current === null) {
      props.onSubmit(post);
    } else {
      props.upDate(post, current._id);
    }
    setPost({
      author: "",
      title: "",
      body: "",
    });
    return <Redirect to='/' />;
  };
  return (
    <div className='contianer'>
      <div className='card card-body bg-light mt-5'>
        <h2>{current === null ? "Add Post" : "Edit Post"}</h2>
        <p>Create post with this form</p>
        <form onSubmit={handleSubmit} action='/'>
          <div>
            <label htmlFor='author'> Post Author</label>
            <input
              type='text'
              name='author'
              className='form-control form-control-lg '
              value={author}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='title'>Post Title</label>
            <input
              type='text'
              name='title'
              className='form-control form-control-lg '
              value={title}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='body'>Post Body</label>
            <textarea
              name='body'
              id=''
              cols='30'
              rows='5'
              className='form-control form-control-lg '
              value={body}
              onChange={onChange}
            />
            <span className='invalid-feedback'></span>
          </div>
          <input
            type='submit'
            value={current === null ? "Submit Post" : "Update Post"}
            className='btn btn-success'
          />
        </form>
      </div>
    </div>
  );
};

export default PostForm;
