import logo from "./logo.svg";
import "./App.css";
import { LoginPage } from "./components/user/login";
import { DetailInfor } from "./components/home/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <LoginPage />
      <ToastContainer />
    </div>
  );
}

export default App;
