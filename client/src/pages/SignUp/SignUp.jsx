import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const [position, setPosition] = useState({ lat: null, lon: null });
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_adhaar_no: "",
    user_gender: "",
    user_preferances: [],
    user_city: "",
    user_state: "",
    user_otp: "",
  });

  const [hideOtp, setHideOtp] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function getLocation() {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          // console.log(position.coords.latitude);
          setPosition({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        });
      } else {
        alert("Turn on location for better suggetions");
        // console.log("Turn on location for better suggetions");
      }
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getLocation();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "user_preferances") {
      setFormData({
        ...formData,
        user_preferances: e.target.value.split(","),
      });
    }else{

      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!/^\d{12}$/.test(formData.user_adhaar_no)) {
      alert("Please enter a valid Aadhar number.");
      setLoading(false);
      return;
    }
    try {
      const updatedFormData = { ...formData, user_location: position };
      // console.log(updatedFormData);
      const response = await axios.post(`${import.meta.env.VITE_BE}/signup`, {
        formData: updatedFormData,
      });

      if (response.status === 201) {
        setHideOtp(false);
        alert("OTP sent on your email please check.");
        if (response.data === true) {
          alert("Registration done successfully.");
          navigate("/signin");
        }
      } else {
        setErrorMsg(response.data.err_msg);
        alert(response.data.err_msg);
        setHideOtp(true);
        setTimeout(() => setErrorMsg(null), 5000);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="signup-form-container">
      {errorMsg && <div className="error-popup">{errorMsg}</div>}

      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="user_name">Full Name</label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="user_email">Email</label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          value={formData.user_email}
          onChange={handleChange}
          required
        />

        <label htmlFor="user_password">Password</label>
        <input
          type="password"
          id="user_password"
          name="user_password"
          value={formData.user_password}
          onChange={handleChange}
          required
        />

        <label htmlFor="user_adhaar_no">Aadhar Number</label>
        <input
          type="text"
          id="user_adhaar_no"
          name="user_adhaar_no"
          value={formData.user_adhaar_no}
          onChange={handleChange}
          required
        />

        <label htmlFor="user_gender">Gender</label>
        <select
          id="user_gender"
          name="user_gender"
          value={formData.user_gender}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select your gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="user_city">City</label>
        <input
          type="text"
          id="user_city"
          name="user_city"
          value={formData.user_city}
          onChange={handleChange}
          required
        />

        <label htmlFor="user_state">State</label>
        <input
          type="text"
          id="user_state"
          name="user_state"
          value={formData.user_state}
          onChange={handleChange}
          required
        />

        <label htmlFor="user_preferances">Preferences</label>
        <input
          type="text"
          id="user_preferances"
          name="user_preferances"
          value={formData.user_preferances}
          onChange={handleChange}
          required
        />

        {!hideOtp && (
          <>
            <label htmlFor="user_otp">OTP</label>
            <input
              type="text"
              id="user_otp"
              name="user_otp"
              value={formData.user_otp}
              onChange={handleChange}
              required
            />
          </>
        )}

        <button type="submit" className="signup-button" disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
