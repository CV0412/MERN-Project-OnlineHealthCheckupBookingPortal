import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/HomeLayout/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
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
          <h3 className="text-center">Login</h3>
          <Form.Item label="Email" name="email">
            <Input placeholder="Enter Your Email" type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Enter Your Password" type="password" required />
          </Form.Item>
          Not Yet Registered?
          <Link to="/register" className="text-light m-2">
            Register
          </Link>
          <br />
          Forget Password ?
          <Link to="/forget-password" className="text-light m-2">
            Reset
          </Link>
          <br />
          <br />
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </Form>
      </div>
    </Navbar>
  );
};

export default Login;
