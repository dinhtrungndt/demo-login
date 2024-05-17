import { Button } from "antd";
import React from "react";

export const LoginPage = () => {
  return (
    <div>
      <h5> Vui lòng đăng nhập bằng facebook để vào kho quản lý </h5>
      <Button
        type="primary"
        style={{ width: "200px", margin: "auto", display: "block" }}
      >
        Đăng nhập bằng facebook
      </Button>
    </div>
  );
};
