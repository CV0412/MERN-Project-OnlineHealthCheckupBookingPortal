import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import Navbar from "../components/HomeLayout/Navbar";
import image from "./../images/genrealcheckup.jpg";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <Navbar>
        <div className="form-container image">
          <Form
            layout="vertical"
            onFinish={onfinishHandler}
            className="register-form bg-info"
          >
            <h3 className="text-center">Register</h3>
            <Form.Item label="Name" name="name">
              <Input placeholder="Enter Your Name" type="text" required />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input placeholder="Enter Your Email" type="email" required />
            </Form.Item>
            <Form.Item label="Number" name="number">
              <Input placeholder="Enter Your Number" type="text" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input
                placeholder="Enter Your Password"
                type="password"
                required
              />
            </Form.Item>
            Already user ?
            <Link to="/login" className="m-2 text-light">
              login
            </Link>
            <br />
            <br />
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </Form>
        </div>
      </Navbar>
    </>
  );
};

export default Register;
