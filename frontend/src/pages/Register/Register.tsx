import React, { useState } from "react";
import "./Register.scss";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    birthdate: "",
    gender: "",
  });

  const [response, setResponse] = useState("");

  const handleChange = (e: React.ChangeEvent<any>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/register",
        inputs,
        {
          withCredentials: true,
        }
      );

      setResponse(res.data);
    } catch (err: any) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__img-inputs-container">
          <div className="register__elements-container">
            <h2>Stwórz swoje darmowe konto</h2>
            <div className="register__inputs-container">
              <div className="register__input-container">
                <h3>Imie</h3>
                <input
                  onChange={handleChange}
                  type="text"
                  name="firstname"
                  placeholder="Wpisz swoje imie"
                />
              </div>
              <div className="register__input-container">
                <h3>Nazwisko</h3>
                <input
                  onChange={handleChange}
                  type="text"
                  name="lastname"
                  placeholder="Wpisz swoje nazwisko"
                />
              </div>
              <div className="register__input-container">
                <h3>Email</h3>
                <input
                  onChange={handleChange}
                  type="text"
                  name="email"
                  placeholder="Wpisz swój email"
                />
              </div>
              <div className="register__input-container">
                <h3>Hasło</h3>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="Wpisz swoje hasło"
                />
              </div>
              <div className="register__input-container">
                <h3>Wybierz zdjęcie</h3>
                <input
                  // onChange={handleFileChange}
                  type="file"
                  name="image"
                  accept="image/*"
                  id="fileInput"
                />
              </div>
              <div className="register__input-container">
                <h3>Data urodzenia</h3>
                <input onChange={handleChange} type="date" name="birthdate" />
              </div>
              <div className="register__input-container">
                <h3>Płeć</h3>
                <select onChange={handleChange} name="gender">
                  <option selected disabled>
                    Wybierz płeć
                  </option>
                  <option value="Mężczyzna">Mężczyzna</option>
                  <option value="Kobieta">Kobieta</option>
                </select>
              </div>
            </div>
            <div className="register__elements">
              <button
                onClick={handleRegister}
                className="register__register-btn"
              >
                Utwórz konto
              </button>
              <p>{response && response}</p>
              <Link to="/login">
                <p>
                  Posiadasz już konto? <span>Zaloguj się</span>
                </p>
              </Link>
              <p className="register__social-icons-p">
                Znajdz mnie oraz moje inne projekty
              </p>
              <div className="register__social-icons">
                <a
                  href="https://github.com/karolbialuk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="register__social-icon">
                    <FaGithub />
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/karol-bialuk-61772227b/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="register__social-icon">
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

export default Register;
