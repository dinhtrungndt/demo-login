import { Button } from "antd";
import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { Card, Image } from "react-bootstrap";
import "../style/login.css";
import { PageMain } from "../../home/pages";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  const responseFacebook = (response) => {
    // console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
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
                  autoLoad={true}
                  fields="name,email,picture"
                  scope="public_profile,user_friends"
                  callback={responseFacebook}
                  icon="fa-facebook"
                  textButton="Đăng nhập bằng facebook"
                />
              </div>
            </div>
          )}
          {login && (
            <Image className="avatarUser" src={picture} roundedCircle />
          )}
        </Card.Header>
        {login && (
          <Card.Body>
            {/* {console.log(data)} */}
            <Card.Title className="nameUser">{data.name}</Card.Title>
            <Card.Text className="emailUser">{data.email}</Card.Text>
            <PageMain {...data} />
          </Card.Body>
        )}
      </Card>
    </div>
  );
};
