import React, { useEffect, useState } from "react";
import { getPostsInPage } from "../../../services/home/home";
import moment from "moment";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";

export const PageMain = (data) => {
  //   console.log("--- > data in main page: ", data);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const showModal = (item) => {
    setPost(item);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onGetPage = async () => {
    try {
      setLoading(true);
      const pageId = "317566994771870";
      const accessToken =
        "EAAW75EF8iHQBO3eM23wig6kFwjwtkl3l5Cm8IWPZBQZBThmfuOuZBuokWSHMx8tdL9zKDUCItpULFQjTfbAvZCykQg1SENCIpmm04fRGstseRzGbdQK8Y30jC3ZC7wzZBu177AxZBJBm95CCZC7XzZAJg0Re0wdZAKw4oVk4tnztm6MIq6FmZCApFGygr601RhG6oNGzi80KaJcx9gDUqht";
      const response = await getPostsInPage(pageId, accessToken);
      // console.log(">>>>>. response in onGetDetailPage", response);
      setPage(response);
      setLoading(false);
    } catch (error) {
      console.error("error", error);
      setLoading(false);
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

  const handleOpenPost = () => {
    // console.log("post", post);
    navigate(`/posts/${post.id}`, { state: { post } });
  };

  useEffect(() => {
    onGetPage();
  }, []);

  // console.log("page in page", page);
  return loading ? (
    <div className="w-full h-full p-2">Loading...</div>
  ) : (
    <div className="w-full h-full p-2">
      <h5>Quản lý trang trên facebook của bạn: </h5>
      {page &&
        page.map((item, index) => (
          <div
            key={index}
            onClick={() => showModal(item)}
            className="border-b-2 border-gray-200 p-2 flex items-center flex-col sm:flex-row justify-between cursor-pointer hover:bg-slate-200"
          >
            <div>
              <div className="text-lg p-3 pb-0 ">
                {item.message
                  ? item.message
                  : item.story
                  ? item.story
                  : "No message"}
              </div>
              <div className="text-xs text-gray-500 p-3 pt-0">
                {formatTime(item.created_time)}
              </div>
            </div>
            <div>
              {item.full_picture && (
                <div className="flex justify-center w-20">
                  <img
                    src={item.full_picture}
                    alt="full_picture"
                    className="w-1/2"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      <Modal
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
          <Button className="bg-green-500" type="primary">
            Thêm
          </Button>
          <Button className="bg-yellow-500" type="primary">
            Sửa
          </Button>
          <Button className="bg-red-500" type="primary">
            Xóa
          </Button>
        </div>
      </Modal>
    </div>
  );
};
