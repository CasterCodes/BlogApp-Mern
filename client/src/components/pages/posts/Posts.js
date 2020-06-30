import React from "react";
import PostItem from "./PostItem";
import PropTypes from "prop-types";
const Posts = ({ posts, loading }) => {
  if (loading) return <h2>Loading...</h2>;
  return posts.map((post) => <PostItem post={post} key={post._id} />);
};
Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default Posts;
