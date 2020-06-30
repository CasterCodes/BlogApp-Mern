import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Moment from "react-moment";
const SinglePost = (props) => {
  const { post, getSinglePost } = props;
  useEffect(() => {
    getSinglePost(props.match.params.id);
    // eslint-disable-next-line
  }, []);
  const onDelete = (id) => {
    props.deletePost(id);
    props.setAlert("Post was deleted successfully", "success");
  };
  const onEdit = (post) => {
    props.onEdit(post);
  };
  if (post === null) {
    return <Redirect to='/' />;
  } else {
    return (
      <div>
        <Link to='/' className='btn btn-light'>
          Back
        </Link>
        <h1>{post.title}</h1>
        <div className='bg-secondary text-white p-2 mb-3'>
          Written by {post.author} on{" "}
          {<Moment format='MMMM Do YYYY, h:mm:ss a'>{post.date}</Moment>}
        </div>
        <p>{post.body}</p>
        <div className='mr-auto'>
          <button className='btn btn-danger' onClick={() => onDelete(post._id)}>
            Delete
          </button>
          <Link
            to='/addpost'
            className='btn btn-primary ml-4'
            onClick={() => onEdit(post)}
          >
            Edit
          </Link>
        </div>
      </div>
    );
  }
};

export default SinglePost;
