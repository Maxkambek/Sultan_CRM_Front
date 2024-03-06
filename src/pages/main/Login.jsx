import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATH, TOKEN, USER_ROLE } from "../../constants/constants";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const LoginIn = (e) => {
    e.preventDefault();
    axios
      .post(API_PATH + "account/login/", {
        phone: login,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem(TOKEN, res.data.token);
        localStorage.setItem(USER_ROLE, res.data.role.toUpperCase());
        localStorage.setItem("USERNAME", res.data.name.toUpperCase());
        if (res.data.role === "Operator") {
          navigate("/odashboard", { replace: true });
          window.location.reload();
        }
        if (res.data.role === "HeadBranch") {
          navigate("/odashboard", { replace: true });
          window.location.reload();
        }
        if (res.data.role === "Boss") {
          navigate("/dashboard");
          window.location.reload();
        }
        if (res.data.role === "Visa") {
          navigate("/vdashboard");
          window.location.reload();
        }
      });
  };

  return (
    <>
      <div className="Login">
        <img className="log_img" src="/img/logo.png" alt="" />
        <form onSubmit={LoginIn} className="log_box">
          <div className="log_name">KIRISH</div>
          <div className="log_h">Login</div>
          <input
            value={login}
            required
            onChange={(e) => setLogin(e.target.value)}
            type="text"
            className="log_inp"
            placeholder="Login"
          />
          <div className="log_h">Parol</div>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="log_inp"
            placeholder="Parol"
          />
          <button type="submit" className="log_btn">
            Kirish
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
