import React from "react";
import { useLocation } from "react-router-dom";

export const PostsPages = () => {
  const location = useLocation();
  const post = location.state.post;

  console.log("post in PostsPages", post);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
      <h1 className="text-2xl font-bold text-center text-gray-800 p-2">
        {post.message}
      </h1>
      <img
        className="w-1/6 h-1/6 object-cover rounded-lg shadow-lg"
        src={post.full_picture}
        alt=""
      />
    </div>
  );
};
