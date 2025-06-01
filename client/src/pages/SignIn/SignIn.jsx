import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import axios from "axios";
import UserContext from "../../context/UserContext/UserContext";

const SignIn = () => {
  const { setUserData } = useContext(UserContext);

  const [loginData, setLoginData] = useState({
    user_email: "",
    user_password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(""); // Clear error before new request

    try {
      const response = await axios.post(`${import.meta.env.VITE_BE}/signin`, {
        loginData,
      });

      if (response.status === 200) {

        if(response.data.user.user_email === "travelbuddy@gmail.com"){
          localStorage.setItem("travel_buddy_token", response.data.token);
          setUserData(response.data.user);
          alert(response.data.msg);
          navigator("/admin-dashboard");
          return;
        }

        localStorage.setItem("travel_buddy_token", response.data.token);
        setUserData(response.data.user);
        alert(response.data.msg);
        navigator("/");
      } else {
        setErrorMsg("Invalid Email or Password!");
      }
    } catch (err) {
      console.error(err.message);
      setErrorMsg("Invalid Email or Password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      {/* Error Message */}
      {errorMsg && <div className="err-msg-pop-up">{errorMsg}</div>}

      <h2>Log In to Your Account</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="user_email">Email</label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          value={loginData.user_email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="user_password">Password</label>
        <input
          type="password"
          id="user_password"
          name="user_password"
          value={loginData.user_password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? <span className="loading-spinner"></span> : "Sign In"}
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
