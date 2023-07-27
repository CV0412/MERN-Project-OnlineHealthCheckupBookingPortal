import React from "react";
import Navbar from "../components/HomeLayout/Navbar";
import insuranceImage from "./../images/insurance.jpg";

const Insurance = () => {
  return (
    <Navbar>
      <div className="container">
        <h1 className="mt-5 mb-4 text-center">Insurance Coverage</h1>
        <div className="row">
          <div className="col-md-6">
            <img
              height={300}
              src={insuranceImage}
              alt="Insurance"
              className="img-fluid mb-4"
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">Why Choose Our Insurance Coverage?</h2>
            <p>
              At our Online Health Check-up Booking Portal, we offer
              comprehensive insurance coverage for your medical needs. Here are
              some reasons to choose our insurance:
            </p>
            <ul className="list-group">
              <li className="list-group-item">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Flexible plans tailored to your requirements
              </li>
              <li className="list-group-item">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Extensive network of healthcare providers
              </li>
              <li className="list-group-item">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Easy claims process for hassle-free reimbursement
              </li>
              <li className="list-group-item">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                24/7 customer support for any assistance needed
              </li>
              <li className="list-group-item">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Competitive premiums and discounts
              </li>
            </ul>
          </div>
        </div>
        <center>
          {" "}
          To Enquire more details about insurance or to claim any insurance
          please contact <b>insurance@healthcheckup.com</b>{" "}
        </center>
      </div>
    </Navbar>
  );
};

export default Insurance;
