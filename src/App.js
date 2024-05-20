import React from "react";
import { LoginPage } from "./components/user/login";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PostsPages } from "./components/home/posts";

function App() {
  return (
    <div className="w-full h-full font-sans text-sm text-gray-700 antialiased overflow-x-hidden overflow-y-auto">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/posts/:id" element={<PostsPages />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
