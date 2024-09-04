import React, { useState, useEffect } from "react";
import validation from "./Regiatrationvalidation";
import "./Styles/Regform.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
  });

  const [formError, setFormError] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [strengthColor, setStrengthColor] = useState("");
  const navigate = useNavigate();

  function PasswordStrength(password) {
    let score = 0;

    if (!password) return "";

    if (password.length > 8) {
      score += 1;
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    }

    if (/\d/.test(password)) {
      score += 1;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    }

    switch (score) {
      case 0:
        setStrengthColor("red");
        return "Password is required";
      case 1:
      case 2:
        setStrengthColor("red");
        return "Weak password";
      case 3:
        setStrengthColor("orange");
        return "Medium password";
      case 4:
      case 5:
        setStrengthColor("green");
        return "Strong password";
      default:
        return "";
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
    // console.log(formdata);
  };
  const handlePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
    setStrength(PasswordStrength(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formdata);
    setFormError(validation(formdata));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formError);
    if (
      Object.keys(formError).length === 0 &&
      isSubmit &&
      strength === "Strong password"
    ) {
      axios
        .post("http://localhost:4000/users", { formdata, password })
        .then((result) => {
          alert("form submitted successfully");
          navigate("/login");
        })
        .catch((err) => console.log(err));
    }
  });

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1 className="reghead">Registration Form</h1>
        <label>Username</label>
        <input
          className="reginput"
          type="text"
          name="username"
          onChange={handleChange}
        />
        <p>{formError.username}</p>

        <label>Email</label>
        <input className="reginput" name="email" onChange={handleChange} />
        <p>{formError.email}</p>

        <label>Password</label>
        <input
          className="reginput"
          type="password"
          name="password"
          onChange={handlePassword}
        />
        <br />
        <small>
          <span
            style={{
              fontWeight: "bold",
              color: strengthColor,
            }}
          >
            {strength}
          </span>
        </small>
        {/* <p>{formError.password}</p> */}
        <br></br>
        <br />
        <button className="btn">Submit</button>
        <br></br>
        <span>
          have an account?<a href="/login">Login</a>
        </span>
      </form>
    </div>
  );
}

export default Registration;
