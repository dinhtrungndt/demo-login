import { Button, Tabs } from "antd";
import React, { useState, useRef } from "react";
import FacebookLogin from "react-facebook-login";
import { Card, Image } from "react-bootstrap";
import "../style/login.css";
import { PageMain } from "../../home/pages";
import { toast } from "react-toastify";
import { DetailInfor } from "../../home/user";
import { PageUser } from "../../home/user/pageUser";

export const LoginPage = () => {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  // const [picture, setPicture] = useState("");

  localStorage.setItem("id_user", JSON.stringify(data.id));
  localStorage.setItem("token", JSON.stringify(data.accessToken));

  const initialItems = [
    {
      label: "Quản lý Page",
      children: <PageMain />,
      key: "1",
      closable: false,
    },
    {
      label: "Trang cá nhân",
      children: <PageUser />,
      key: "2",
      closable: false,
    },
    {
      label: "Thông tin cá nhân",
      children: <DetailInfor />,
      key: "3",
      closable: false,
    },
    {
      label: "Thông tin bạn bè",
      children: "Đang cập nhật...",
      key: "4",
    },
  ];

  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };
  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: "Trang mới",
      children:
        "Trang mới này chỉ là trang rỗng. Nếu bạn muốn nâng cấp bạn vui lòng liên hệ với đội ngũ IT của chúng tôi.",
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  const responseFacebook = (response) => {
    // console.log(response);
    setData(response);
    // setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
      toast.success("Đăng nhập thành công");
    } else {
      setLogin(false);
    }
  };

  return (
    <div className="justify-center">
      <Card>
        <Card.Header>
          {!login && (
            <div className="pt-12 flex justify-center items-center flex-col">
              <h4 className="pb-3">
                Vui lòng đăng nhập bằng facebook để vào kho quản lý{" "}
              </h4>
              <div>
                <FacebookLogin
                  appId="1253008412343322"
                  // appId="473464405251591"
                  autoLoad={false}
                  fields="name,email,picture"
                  scope="email,user_photos,user_posts,user_birthday,user_hometown,user_location,user_likes,user_events,user_videos,user_friends,user_gender,user_link,user_age_range,manage_fundraisers,public_profile"
                  callback={responseFacebook}
                  icon="fa-facebook"
                  textButton="Đăng nhập bằng facebook"
                />
              </div>
            </div>
          )}
          {/* {login && (
            <Image className="avatarUser" src={picture} roundedCircle />
          )} */}
        </Card.Header>
        {login && (
          <Card.Body>
            {/* {console.log(data)} */}
            <Card.Title className="nameUser">
              Trang quản trị Facebook
            </Card.Title>
            {/* <Card.Text className="emailUser">{data.email}</Card.Text> */}
            <Tabs
              type="editable-card"
              onChange={onChange}
              activeKey={activeKey}
              onEdit={onEdit}
              items={items}
            />
          </Card.Body>
        )}
      </Card>
    </div>
  );
};
