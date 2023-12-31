import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ============ handle availiblity
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());

      var t = time.split(":");
      var a = time.split(" ");

      const res = await axios.post(
        "/api/v1/user/booking-availbility",
        { doctorId: params.doctorId, t: t[0], a: a[1] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf("day");
  };

  // =============== booking func
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      var t = time.split(":");
      var a = time.split(" ");

      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
          t: t[0],
          a: a[1],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h3 className="text-center bg-dark text-light">Booking Page</h3>
      <div className="container m-2">
        {doctors && (
          <div className="text-center">
            <div className="d-flex justify-content-evenly">
              <h5 className="text-light">
                Dr.{doctors.firstName} {doctors.lastName}
              </h5>
              <h5 className="text-light">
                Fees : {doctors.feesPerCunsaltation}
              </h5>
              <h5 className="text-light">
                Timings : {doctors.timings && doctors.timings[0]} -{" "}
                {doctors.timings && doctors.timings[1]}{" "}
              </h5>
            </div>
            <div className="d-flex flex-column w-50">
              <DatePicker
                aria-required={"true"}
                className="mt-3"
                disabledDate={disabledDate}
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                aria-required={"true"}
                format="hh:mm a"
                className="mt-3"
                onChange={(value) => {
                  setTime(moment(value).format("HH:mm a"));
                }}
              />{" "}
              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button>
              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
