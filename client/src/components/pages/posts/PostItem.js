import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
const PostItem = ({ post }) => {
  return (
    <div className='row mb-3'>
      <div className='card card-body mb-3'>
        <h4 className='card-title'>{post.title}</h4>
        <div className='bg-light p-2 mb-3'>
          Written by <strong>{post.author}</strong>{" "}
          {<Moment format='MMMM Do YYYY, h:mm:ss a'>{post.date}</Moment>}
        </div>
        <p className='card-text'>{post.body}</p>
        <Link className='btn btn-dark' to={`/single/${post._id}`}>
          More
        </Link>
      </div>
    </div>
  );
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};
export default PostItem;
