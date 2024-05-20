import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getComments, getCommentsReply } from "../../../services/home/home";
import moment from "moment";

export const PostsPages = () => {
  const location = useLocation();
  const post = location.state.post;
  const [comments, setComments] = useState([]);
  const accessToken =
    "EAAW75EF8iHQBO3eM23wig6kFwjwtkl3l5Cm8IWPZBQZBThmfuOuZBuokWSHMx8tdL9zKDUCItpULFQjTfbAvZCykQg1SENCIpmm04fRGstseRzGbdQK8Y30jC3ZC7wzZBu177AxZBJBm95CCZC7XzZAJg0Re0wdZAKw4oVk4tnztm6MIq6FmZCApFGygr601RhG6oNGzi80KaJcx9gDUqht";

  // console.log("comments in PostsPages", comments);

  const onGetAllComments = async () => {
    const response = await getComments(post.id, accessToken);
    const resAll = await Promise.all(
      response.map(async (item) => {
        const response = await getCommentsReply(item.id, accessToken);
        return {
          ...item,
          reply: response,
        };
      })
    );
    setComments(resAll);
  };

  const formatTime = (createdAt) => {
    const currentTime = moment();
    const postTime = moment(createdAt);
    const diffInSeconds = currentTime.diff(postTime, "seconds");

    if (diffInSeconds < 1) {
      return "Vừa đăng";
    } else if (diffInSeconds < 60) {
      return `${diffInSeconds} giây trước`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} phút trước`;
    } else if (diffInSeconds < 24 * 3600) {
      return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    } else if (diffInSeconds < 30 * 24 * 3600) {
      return `${Math.floor(diffInSeconds / (24 * 3600))} ngày trước`;
    } else if (diffInSeconds < 12 * 30 * 24 * 3600) {
      return `${Math.floor(diffInSeconds / (30 * 24 * 3600))} tháng trước`;
    } else {
      return `${Math.floor(diffInSeconds / (12 * 30 * 24 * 3600))} năm trước`;
    }
  };

  useEffect(() => {
    onGetAllComments();
  }, []);

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
      <div className="w-full p-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="ml-2 font-semibold text-gray-800">
                  {comment.from.name}
                </p>
              </div>
              <p className="text-xs text-gray-500">
                {formatTime(comment.created_time)}
              </p>
            </div>
            <p className="text-gray-800">{comment.message}</p>
            <div className="ml-8">
              {console.log("comment.reply", comment.reply)}
              {/* {console.log(
                "reply.id",
                comment.reply.map((reply) => reply?.message_tags?.length > 0)
              )} */}
              {comment.reply.map((reply) => (
                <div key={reply.id} className="flex items-center p-2">
                  <p className="ml-2 font-semibold text-gray-800">
                    {reply.from.name}
                  </p>
                  <p className="ml-2 text-gray-800">{reply.message}</p>
                  {/* xếp theo id comment reply */}
                </div>
              ))}
            </div>
            {/* input reply */}
            <div className="flex items-center p-2">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Nhập phản hồi"
              />
              <button className="p-2 bg-blue-500 text-white rounded-lg ml-2 hover:bg-blue-600">
                Gửi
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Bình luận */}
      <div className="w-full p-4 flex items-center">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Nhập bình luận"
        />
        <button className="p-2 bg-blue-500 text-white rounded-lg ml-2 hover:bg-blue-600">
          Gửi
        </button>
      </div>
    </div>
  );
};
