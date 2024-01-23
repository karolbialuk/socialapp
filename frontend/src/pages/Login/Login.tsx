import React, { useState } from "react";
import { IoAccessibility } from "react-icons/io5";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Login.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [response, setResponse] = useState<any>("");

  const handleChange = (e: React.ChangeEvent<any>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        inputs,
        { withCredentials: true }
      );
      console.log(res);
      if (res.status === 201) setResponse(res.data);

      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (err: any) {
      console.error(err.response.data);
    }
  };

  console.log(inputs);

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__img-inputs-container">
          <div className="login__elements-container">
            <h2>Zaloguj się na swoje konto</h2>
            <div className="login__inputs-container">
              <div className="login__input-container">
                <h3>Email</h3>
                <input
                  onChange={handleChange}
                  type="text"
                  name="email"
                  placeholder="Wpisz swój email"
                />
              </div>
              <div className="login__input-container">
                <h3>Hasło</h3>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="Wpisz swoje hasło"
                />
              </div>
            </div>
            <div className="login__elements">
              <button onClick={handleLogin} className="login__login-btn">
                Zaloguj się
              </button>
              <p>{response && response}</p>
              <Link to="/register">
                <p>
                  Nie masz jeszcze konta? <span>Zarejstruj się</span>
                </p>
              </Link>
              <p className="login__social-icons-p">
                Znajdz mnie oraz moje inne projekty
              </p>
              <div className="login__social-icons">
                <a
                  href="https://github.com/karolbialuk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="login__social-icon">
                    <FaGithub />
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/karol-bialuk-61772227b/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="login__social-icon">
                    <FaLinkedin />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
