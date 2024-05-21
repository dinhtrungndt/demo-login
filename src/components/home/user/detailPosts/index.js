import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getAccounts,
  getCommentsAccounts,
} from "../../../../services/user/user";
import moment from "moment";
import { IoIosMore } from "react-icons/io";

export const DetailPostsAccount = () => {
  const location = useLocation();
  const postsAccounts = location.state.postDetail;
  const id_user = JSON.parse(localStorage.getItem("id_user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [accounts, setAccounts] = useState([]);
  const [commentsAccounts, setCommentsAccounts] = useState([]);

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

  const onGetCommentsAccounts = async () => {
    try {
      const response = await getCommentsAccounts(postsAccounts.id, token);
      setCommentsAccounts(response);
      console.log(
        "postsAccounts.id in onGetCommentsAccounts",
        postsAccounts.id
      );
      console.log("token in onGetCommentsAccounts", token);
      console.log("response in onGetCommentsAccounts", response);
      return response;
    } catch (error) {
      console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
      throw error;
    }
  };

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
    onGetCommentsAccounts();
  }, []);

  // console.log("commentsAccounts", commentsAccounts);
  return (
    <div className="w-full max-w-md mx-auto pt-2">
      <div
        key={postsAccounts.id}
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
                  {formatTime(postsAccounts.created_time)}
                </p>
                <p className="ml-1">•</p>
                <p className="text-gray-500 text-xs ml-1">
                  {formatPrivacy(postsAccounts.privacy)}
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 flex items-center">
            <IoIosMore
              className="text-gray-500 cursor-pointer text-3xl pl-2 hover:text-gray-800"
              // onClick={() => showModal(postsAccounts)}
            />
          </p>
        </div>
        <p className="text-gray-700 pt-1">{postsAccounts.message}</p>
        <div className="m-2">
          {postsAccounts.full_picture && (
            <img
              className="w-full h-64 object-cover"
              src={postsAccounts.full_picture}
              alt="Ảnh bài viết"
            />
          )}
        </div>
        <hr />
      </div>
    </div>
  );
};
