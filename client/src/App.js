import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import PostForm from "./components/pages/posts/postForm";
import Posts from "./components/pages/posts/Posts";
import SinglePost from "./components/pages/posts/singlePost";
import Alert from "./components/layout/Alert";
import "./App.css";

const App = (props) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(null);
  const [alert, setAlert] = useState(null);
  useEffect(() => {
    getPosts();
  }, []);

  // add post
  const addPost = async (post) => {
    try {
      await fetch("/posts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(post),
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const onSubmit = (post) => {
    addPost(post);
    setPosts([post, ...posts]);
  };

  // get all posts
  const getPosts = async () => {
    setLoading(true);
    const res = await fetch("/posts");
    const data = await res.json();
    const postsArr = data.data;
    setPosts(postsArr);
    setLoading(false);
  };

  // get a single post
  const getSinglePost = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/posts/${id}`);
      const data = await res.json();
      const postObject = data.data;
      setPost(postObject);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete a post
  const deletePost = async (id) => {
    await fetch(`/posts/${id}`, {
      method: "DELETE",
    });
    setPosts([...posts, posts.filter((post) => post.id !== id)]);
  };

  // edit post
  const onEdit = (post) => {
    setCurrent(post);
  };

  // update post
  const upDate = async (post, id) => {
    try {
      await fetch(`/posts/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(post),
      });
      setAlert({ message: "Post updated successfully", type: "success" });
      setCurrent(null);
    } catch (error) {
      console.log(error.message);
    }
  };
  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  // remove alert alert 3s
  if (alert) {
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route path='/about' component={About} />
            <Route
              exact
              path='/addpost'
              render={(props) => (
                <PostForm
                  {...props}
                  onSubmit={onSubmit}
                  upDate={upDate}
                  setAlert={showAlert}
                  current={current}
                />
              )}
            />
            <Route
              exact
              path='/'
              render={(props) => (
                <Posts {...props} posts={posts} loading={loading} />
              )}
            />
            <Route
              exact
              path='/single/:id'
              render={(props) => (
                <SinglePost
                  {...props}
                  post={post}
                  onEdit={onEdit}
                  setAlert={showAlert}
                  deletePost={deletePost}
                  getSinglePost={getSinglePost}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
