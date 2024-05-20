import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getComments,
  getCommentsReply,
  postComment,
} from "../../../services/home/home";
import moment from "moment";
import { toast } from "react-toastify";
import { IoIosMore } from "react-icons/io";
import { Button, Modal } from "antd";

export const PostsPages = () => {
  const location = useLocation();
  const post = location.state.post;
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [yesNo, setYesNo] = useState(false);
  const accessToken =
    "EAAW75EF8iHQBO3eM23wig6kFwjwtkl3l5Cm8IWPZBQZBThmfuOuZBuokWSHMx8tdL9zKDUCItpULFQjTfbAvZCykQg1SENCIpmm04fRGstseRzGbdQK8Y30jC3ZC7wzZBu177AxZBJBm95CCZC7XzZAJg0Re0wdZAKw4oVk4tnztm6MIq6FmZCApFGygr601RhG6oNGzi80KaJcx9gDUqht";

  // console.log("comments in PostsPages", comments);

  const handleYes = async () => {
    console.log("yes");
  };

  const showModal = (item) => {
    console.log("item", item);
    setComments(item);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onGetAllComments = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  const onReloadComment = async () => {
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
    setLoading(false);
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

  const handlePostComment = async () => {
    try {
      const response = await postComment(post.id, accessToken, message);
      // console.log("response", response);
      onReloadComment();
      toast.success("Bình luận thành công");
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleDeletePost = async () => {
    console.log("delete post");
  };

  useEffect(() => {
    onGetAllComments();
  }, []);

  return loading ? (
    <div className="w-full h-full p-2 justify-center items-center flex flex-col text-lg text-blue-500">
      Loading...
    </div>
  ) : (
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
        {comments?.map((comment) => (
          <div key={comment.id} className="flex flex-col p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="ml-2 font-semibold text-gray-800">
                  {comment.from.name}
                </p>
              </div>
              <p className="text-xs text-gray-500 flex items-center">
                {formatTime(comment.created_time)}
                <IoIosMore
                  className="text-gray-500 cursor-pointer text-xl pl-2"
                  onClick={() => showModal(comment)}
                />
              </p>
            </div>
            <p className="text-gray-800">{comment.message}</p>
            <div className="ml-8">
              {/* {console.log(
                "comment.reply",
                comment.reply.map((reply) => reply.parent.id)
              )} */}
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
          </div>
        ))}
      </div>
      {/* Bình luận */}
      <div className="w-full p-4 flex items-center">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Nhập bình luận"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-lg ml-2 hover:bg-blue-600"
          onClick={handlePostComment}
        >
          Gửi
        </button>
      </div>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={null}
        centered
        footer={[<div key="back"></div>]}
      >
        <div className="flex justify-between">
          <Button className="bg-blue-500" type="primary">
            Thêm
          </Button>
          <Button className="bg-yellow-500" type="primary">
            Sửa
          </Button>
          <Button
            className="bg-red-500"
            type="primary"
            onClick={handleDeletePost}
          >
            Xóa
          </Button>
        </div>
      </Modal>
    </div>
  );
};
