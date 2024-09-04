import React, { useState, useEffect } from "react";
import "./Styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validation from "./Regiatrationvalidation";

function Login() {
  const [logdata, setlogdata] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({});
  const [passerror, setpasserror] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlogdata({ ...logdata, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validation(logdata));

    axios.get("http://localhost:4000/users").then((result) => {
      result.data.map((user) => {
        console.log(user.formdata.email);
        console.log(user.password);
        if (user.formdata.email === logdata.email) {
          if (user.password === logdata.password) {
            alert("login successfuly");
            navigate("/");
          } else {
            setpasserror("Wrong Passowrd.");
          }
        }
      });
    });
  };

  return (
    <div>
      <form className="loginform" onSubmit={handleSubmit}>
        <h1 className="loginhead">LOGIN</h1>
        <label>Email</label>
        <input
          className="logininput"
          name="email"
          onChange={handleChange}
        ></input>
        <p>{formError.email}</p>
        <label>Password</label>
        <input
          className="logininput"
          type="password"
          name="password"
          onChange={handleChange}
        ></input>
        <p>{passerror}</p>
        <button className="loginbtn">Login</button>
        <br></br>

        <span>
          Don't have an account?<a href="/registration">Sign up</a>
        </span>
      </form>
    </div>
  );
}

export default Login;
