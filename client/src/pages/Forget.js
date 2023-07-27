import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/HomeLayout/Navbar";

const Forget = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      alert("Password Reset Successfull");
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/dashboard");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };

  return (
    <Navbar>
      <div className="form-container image1">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form bg-info "
        >
          <h3 className="text-center">Forget Password</h3>
          <Form.Item label="Email" name="email">
            <Input placeholder="Enter your Email" type="email" required />
          </Form.Item>
          <Form.Item label="Number" name="answer">
            <Input placeholder="Enter Your Number" type="text" required />
          </Form.Item>
          <Form.Item label="New Password" name="newpassword">
            <Input
              placeholder="Enter your New password"
              type="password"
              required
            />
          </Form.Item>
          Not Yet Registered?
          <Link to="/register" className="text-light m-2">
            Register
          </Link>
          <br />
          Remembered Your Password ?
          <Link to="/login" className="text-light m-2">
            Login
          </Link>
          <br />
          <br />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Form>
      </div>
    </Navbar>
  );
};

export default Forget;
