import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { Card, Image } from "react-bootstrap";
import logo from "./logo.svg";
import "./App.css";
import { LoginPage } from "./components/user/login";
import { DetailInfor } from "./components/home/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <div class="container">
      <Card style={{ width: "600px" }}>
        <Card.Header>
          {!login && (
            <FacebookLogin
              appId="1253008412343322"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              callback={responseFacebook}
              icon="fa-facebook"
            />
          )}
          {login && <Image src={picture} roundedCircle />}
        </Card.Header>
        {login && (
          <Card.Body>
            {console.log(data)}
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>{data.email}</Card.Text>
          </Card.Body>
        )}
      </Card>
    </div>
  );
}

export default App;
