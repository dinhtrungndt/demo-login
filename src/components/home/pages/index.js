import React, { useEffect, useState } from "react";
import {
  addPost,
  deletePost,
  editPost,
  getDetailPage,
  getPostsInPage,
  postStatus,
  uploadImageStatus,
} from "../../../services/home/home";
import moment from "moment";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const accessToken =
  "EAAW75EF8iHQBO3eM23wig6kFwjwtkl3l5Cm8IWPZBQZBThmfuOuZBuokWSHMx8tdL9zKDUCItpULFQjTfbAvZCykQg1SENCIpmm04fRGstseRzGbdQK8Y30jC3ZC7wzZBu177AxZBJBm95CCZC7XzZAJg0Re0wdZAKw4oVk4tnztm6MIq6FmZCApFGygr601RhG6oNGzi80KaJcx9gDUqht";

export const PageMain = (data) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [message, setMessage] = useState("");
  const [yesNo, setYesNo] = useState(false);
  const [addPostModal, setAddPostModal] = useState(false);
  const [putPostModal, setPutPostModal] = useState(false);
  const [imageUrls, setImageUrls] = useState("");
  const [imageFiles, setImageFiles] = useState(null);
  // const [images, setImages] = useState("");
  const navigate = useNavigate();

  // console.log("postpost", post);

  // const handleEndImage = () => {
  //   setImages([...imageUrls, ...imageFiles]);
  // };

  const handleLinkChange = (e) => {
    setImageUrls(e.target.value);
  };

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("cloudinary", file);
      const res = await uploadImageStatus(formData);
      setImageFiles(res);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleAddModal = async () => {
    try {
      if (message === "" && imageUrls === "" && imageFiles === null) {
        toast.error("Bạn vui lòng nhập message hoặc link");
        return;
      }

      const link = imageUrls !== "" ? imageUrls : imageFiles;
      const res = await postStatus(page[0]?.id, accessToken, message, link);
      setMessage("");
      setImageUrls("");
      setImageFiles(null);
      setAddPostModal(false);
      setIsModalOpen(false);
      toast.success("Đăng bài thành công");
      onGetReloadAll();
    } catch (error) {
      console.error("error", error);
    }
  };

  const handlePutModal = async () => {
    try {
      const res = await editPost(post.id, accessToken, message);
      setPutPostModal(false);
      setIsModalOpen(false);
      setImageUrls("");
      setImageFiles(null);
      setMessage("");
      toast.success("Sửa bài thành công");
      onGetReloadAll();
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleClosePutPost = () => {
    setPutPostModal(false);
  };

  const handleCloseAddPost = () => {
    setAddPostModal(false);
  };

  const handleYes = async () => {
    try {
      setYesNo(false);
      setIsModalOpen(false);
      const updatePost = page[0].posts.filter((item) => item.id !== post.id);
      const res = await deletePost(post.id, accessToken);
      setPage([
        {
          ...page[0],
          posts: updatePost,
        },
      ]);
      toast.success("Xóa bài thành công");
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleNo = () => {
    setYesNo(false);
  };

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

  const onGetReloadAll = async () => {
    try {
      const pageId = "317566994771870";
      const res = await getDetailPage(pageId, accessToken);
      const resAll = await Promise.all(
        res.map(async (item) => {
          const res = await getPostsInPage(item.id, accessToken);
          return {
            ...item,
            posts: res,
          };
        })
      );
      setPage(resAll);
      setLoading(false);
    } catch (error) {
      console.error("error", error);
    }
  };

  const onGetDetailAndPage = async () => {
    try {
      setLoading(true);
      const pageId = "317566994771870";
      const res = await getDetailPage(pageId, accessToken);
      const resAll = await Promise.all(
        res.map(async (item) => {
          const res = await getPostsInPage(item.id, accessToken);
          return {
            ...item,
            posts: res,
          };
        })
      );
      setPage(resAll);
      setLoading(false);
    } catch (error) {
      console.error("error", error);
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
    navigate(`/posts/${post.id}`, { state: { post } });
  };

  const handleAddPost = () => {
    setAddPostModal(true);
  };

  const handlePutPost = () => {
    setPutPostModal(true);
  };

  const handleDeletePost = () => {
    setYesNo(true);
    toast.error("Cảnh báo: Bạn đang muốn xóa bài viết này!");
  };

  useEffect(() => {
    onGetDetailAndPage();
  }, []);

  // useEffect(() => {
  //   handleEndImage();
  // }, [imageUrls, imageFiles]);

  return loading ? (
    <div className="w-full h-full p-2 justify-center items-center flex flex-col text-lg text-blue-500">
      Loading...
    </div>
  ) : (
    <div className="w-full h-full p-2">
      <div className="flex row items-center mb-3">
        <h5>Trang của bạn: </h5>
        <img
          src={page[0].picture.data.url}
          alt="page"
          className="w-10 h-10 ml-2 rounded-full object-cover shadow-lg"
        />
        <h5 className="text-blue-600 pl-1">{page[0].name}</h5>
      </div>
      {page[0].posts.map((item, index) => (
        <div
          key={index}
          onClick={() => showModal(item)}
          className="border-b-2 border-gray-200 flex items-center flex-col sm:flex-row justify-between cursor-pointer hover:bg-slate-200"
        >
          <div>
            <div className="text-lg p-3 pb-0 ">
              {item.message ? item.message : item.story ? item.story : ""}
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
        title={post?.message !== undefined ? post?.message : post?.story}
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
      <Modal
        title="Đăng bài viết"
        open={addPostModal}
        onOk={handleAddModal}
        onCancel={handleCloseAddPost}
        centered
        footer={[
          <Button key="back" onClick={handleCloseAddPost}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddModal}>
            Đăng bài
          </Button>,
        ]}
      >
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Nhập nội dung"
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="flex justify-between mt-3">
            <input
              type="text"
              placeholder="Dán link"
              onBlur={handleLinkChange}
              className="w-1/2 p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="file"
              multiple
              className="w-1/2 p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex flex-wrap items-center justify-center mt-3">
            {imageUrls && (
              <img src={imageUrls} alt="Link Image" className="w-1/2 p-2" />
            )}
            {imageFiles && (
              <img src={imageFiles} alt="File Image" className="w-1/2 p-2" />
            )}
          </div>
        </div>
      </Modal>
      <Modal
        title="Sửa bài viết"
        open={putPostModal}
        onOk={handlePutModal}
        onCancel={handleClosePutPost}
        centered
        footer={[
          <Button key="back" onClick={handleClosePutPost}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handlePutModal}>
            Sửa bài
          </Button>,
        ]}
      >
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Nhập nội dung"
            defaultValue={post?.message === undefined ? "" : post?.message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="flex flex-wrap items-center justify-center mt-3">
            {post?.full_picture && (
              <img
                src={post?.full_picture}
                alt="full_picture"
                className="w-1/6 p-2"
              />
            )}
          </div>
        </div>
      </Modal>
      <Modal
        title="Xác nhận"
        open={yesNo}
        onOk={handleYes}
        onCancel={handleNo}
        centered
        footer={[
          <Button key="back" onClick={handleNo}>
            No
          </Button>,
          <Button key="submit" type="primary" onClick={handleYes}>
            Yes
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn xóa bài viết này không?</p>
      </Modal>
    </div>
  );
};
