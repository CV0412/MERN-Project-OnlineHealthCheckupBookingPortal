import React from "react";
import Navbar from "./Navbar";

function About() {
  return (
    <Navbar>
      <div className="container">
        <h1 className="text-center mt-4">About Us</h1>
        <p>
          Welcome to the Online Health Check-up Booking Portal! We are dedicated
          to providing convenient and accessible health check-up services to
          individuals. Our platform allows you to book appointments for a
          variety of check-ups, including general health check-ups, specialized
          check-ups, and dental check-ups.
        </p>
        <p>
          Our team of experienced healthcare professionals ensures that you
          receive the best care and attention during your check-up appointments.
          We strive to make the booking process seamless and efficient, allowing
          you to schedule your appointments with ease.
        </p>
        <p>
          With our Online Health Check-up Booking Portal, you can take control
          of your health by staying proactive and maintaining regular check-ups.
          We believe that prevention is better than cure, and our platform
          empowers you to prioritize your well-being.
        </p>
        <p>
          Thank you for choosing our platform for your health check-up needs. We
          look forward to serving you and helping you maintain a healthy
          lifestyle.
        </p>
      </div>{" "}
    </Navbar>
  );
}

export default About;
