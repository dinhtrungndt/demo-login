import * as antd from "antd";
import * as icons from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  getComments,
  getDetailPage,
  postStatus,
} from "../../../services/home/home";
import { getAccounts } from "../../../services/user/user";
import "../css/user.css";
import { Button, message, Upload, Modal } from "antd";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";

export const DetailInfor = () => {
  const [user, setUser] = useState(null);
  const [detailPage, setDetailPage] = useState(null);
  const [comments, setComments] = useState([]);
  const [inputContent, setInputContent] = useState("");
  const [loading, setLoading] = useState(true);
  const idUser = "100015115748911";
  const accessToken =
    "EAAW75EF8iHQBO3eM23wig6kFwjwtkl3l5Cm8IWPZBQZBThmfuOuZBuokWSHMx8tdL9zKDUCItpULFQjTfbAvZCykQg1SENCIpmm04fRGstseRzGbdQK8Y30jC3ZC7wzZBu177AxZBJBm95CCZC7XzZAJg0Re0wdZAKw4oVk4tnztm6MIq6FmZCApFGygr601RhG6oNGzi80KaJcx9gDUqht";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handlePosts();
    toast.success("Đăng bài thành công");
    setInputContent("");
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePosts = async () => {
    try {
      const pageId = "317566994771870";
      const response = await postStatus(pageId, accessToken, inputContent);
      console.log(">>>>>. response in handlePosts", response);
      setLoading(false);
    } catch (error) {
      console.error("error", error);
      setLoading(false);
    }
  };

  const onGetDataDetailUser = async () => {
    try {
      const response = await getAccounts(idUser, accessToken);
      // console.log(">>>>>. response in onGetDataDetailUser", response);
      setUser(response);
      setLoading(false);
    } catch (error) {
      console.error("error onGetDataDetailUser", error);
      setLoading(false);
    }
  };

  const onGetDetailPage = async () => {
    try {
      const pageId = "317566994771870";
      const response = await getDetailPage(pageId, accessToken);
      // console.log(">>>>>. response in onGetDetailPage", response);
      setDetailPage(response);
      setLoading(false);
    } catch (error) {
      console.error("error", error);
      setLoading(false);
    }
  };

  const onGetComments = async () => {
    try {
      const postId = "317566994771870_122103207110320163";
      const response = await getComments(postId, accessToken);
      // console.log(">>>>>. response in onGetComments", response);
      setComments(response);
      setLoading(false);
    } catch (error) {
      console.error("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetDataDetailUser();
    onGetDetailPage();
    onGetComments();
  }, []);

  // console.log(">>>>>. comments", comments);

  if (loading) {
    return <h5> Loading... </h5>;
  }

  if (!user) {
    return <h5> Không tìm thấy user </h5>;
  }

  const { createRoot } = ReactDOM;

  const { UploadOutlined } = icons;
  const { Button, message, Upload } = antd;
  const props = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="detail-infor">
      <h5> Hi! {user.name} </h5>
      <p> ID: {user.id} </p>

      <div className="detail-page">
        <h5> List Page </h5>
        {/* <p> ID: {detailPage.id} </p> */}
        <p> Name: {detailPage.name} </p>
      </div>

      <div className="comments">
        <h5> List Comments </h5>
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            {/* <p> ID: {comment.id} </p> */}
            <p className="name"> Name: {comment.from.name} </p>
            <p> Message: {comment.message} </p>
          </div>
        ))}
      </div>

      <div className="buttons">
        <Button type="primary" onClick={showModal} className="btn-add">
          Thêm
        </Button>
        <button className="btn-update">Cập nhập</button>
        <button className="btn-delete">Xóa</button>
      </div>

      <Modal
        title={detailPage.name}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="text-content">Nhập nội dung đăng(Bắt buộc): </p>
        <input
          className="input-content"
          type="text"
          onChange={(e) => setInputContent(e.target.value)}
        ></input>
        <p className="text-content">File đính kèm(Không bắt buộc): </p>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Modal>
    </div>
  );
};
