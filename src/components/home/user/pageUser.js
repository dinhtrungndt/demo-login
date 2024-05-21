import React, { useEffect, useState } from "react";
import { getAccounts, getPostsAccounts } from "../../../services/user/user";
import moment from "moment";
import { IoIosMore } from "react-icons/io";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";

export const PageUser = () => {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [postsAccounts, setPostsAccounts] = useState([]);
  const [postDetail, setPostDetail] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const id_user = JSON.parse(localStorage.getItem("id_user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  //   console.log("accountsaccountsaccounts", accounts);

  const formatPrivacy = (item) => {
    if (item.value === "EVERYONE") {
      return "Mọi người";
    }
    if (item.value === "ALL_FRIENDS") {
      return "Bạn bè";
    }
    if (item.value === "SELF") {
      return "Chỉ mình tôi";
    }
  };

  const onGetPostsAccounts = async (idUser, accessToken) => {
    try {
      const response = await getPostsAccounts(idUser, accessToken);
      setPostsAccounts(response);
      return response;
    } catch (error) {
      console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
      throw error;
    }
  };

  const onGetAccounts = async (idUser, accessToken) => {
    try {
      const response = await getAccounts(idUser, accessToken);
      setAccounts(response);
      return response;
    } catch (error) {
      console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
      throw error;
    }
  };

  const showModal = (item) => {
    setIsModalOpen(true);
    setPostDetail(item);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpenPost = () => {
    // console.log("handleOpenPost", postDetail);
    navigate(`/detail-account-posts/${postDetail.id}`, {
      state: { postDetail },
    });
  };

  const handleAddPost = () => {
    console.log("handleAddPost", postDetail);
  };

  const handlePutPost = () => {
    console.log("handlePutPost", postDetail);
  };

  const handleDeletePost = () => {
    console.log("handleDeletePost", postDetail);
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
    onGetAccounts(id_user, token);
    onGetPostsAccounts(id_user, token);
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <div className="w-full max-w-md">
        {postsAccounts.map((post) => (
          <div
            key={post.id}
            className="w-full border border-gray-300 rounded-lg p-4 mb-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={accounts?.picture?.data?.url}
                  alt="Avatar của bạn"
                />
                <div className="pl-2">
                  <p className="text-gray-700 font-semibold">{accounts.name}</p>
                  <div className="flex items-center">
                    <p className="text-gray-500 text-xs">
                      {formatTime(post.created_time)}
                    </p>
                    <p className="ml-1">•</p>
                    <p className="text-gray-500 text-xs ml-1">
                      {formatPrivacy(post.privacy)}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 flex items-center">
                <IoIosMore
                  className="text-gray-500 cursor-pointer text-3xl pl-2 hover:text-gray-800"
                  onClick={() => showModal(post)}
                />
              </p>
            </div>
            <p className="text-gray-700 pt-1">{post.message}</p>
            <div className="m-2">
              {post.full_picture && (
                <img
                  className="w-full h-64 object-cover"
                  src={post.full_picture}
                  alt="Ảnh bài viết"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <Modal
        title={
          postsAccounts?.message !== undefined
            ? postsAccounts?.message
            : postsAccounts?.story
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={null}
        centered
        footer={[<div key="back"></div>]}
      >
        <div className="flex justify-between">
          <Button
            className="bg-blue-500"
            type="primary"
            onClick={handleOpenPost}
          >
            Chi tiết
          </Button>
          <Button
            className="bg-green-500"
            type="primary"
            onClick={handleAddPost}
          >
            Thêm
          </Button>
          <Button
            className="bg-yellow-500"
            type="primary"
            onClick={handlePutPost}
          >
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
