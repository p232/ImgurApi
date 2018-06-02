import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../css/post.css";

const Post = ({ post }) => (
  <div className="col-md-3 col-xs-4 post">
    <Link className="post__link" to={`gallery/${post.id}`}>
      <div className="post__container">
        <div className="post__image-container">
          <img
            className="post__image"
            src={
              post.cover
                ? `http://i.imgur.com/${post.cover}b.jpg`
                : `http://i.imgur.com/${post.id}b.jpg`
            }
          />
        </div>
        <p className="post__title">{post.title}</p>
        <div className="post__statistic">
          <p>{post.views} views</p>
          <p>{post.points} points</p>
        </div>
      </div>
    </Link>
  </div>
);

export default Post;
