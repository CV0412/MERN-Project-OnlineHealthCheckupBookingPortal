import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();

  const getRandomStars = () => {
    const minStars = 3;
    const maxStars = 5;
    const numStars =
      Math.floor(Math.random() * (maxStars - minStars + 1)) + minStars;
    return "⭐️".repeat(numStars);
  };
  return (
    <>
      <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() =>
          navigate(`/dashboard/doctor/book-appointment/${doctor._id}`)
        }
      >
        <div className="card-header">
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience</b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Cunsaltation</b> {doctor.feesPerCunsaltation}
          </p>
          <p>
            <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
          <p>
            <b>Rate:</b>
            {getRandomStars()}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
