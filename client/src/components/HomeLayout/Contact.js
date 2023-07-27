import React from "react";
import Navbar from "./Navbar";

function Contact() {
  return (
    <Navbar>
      <div className="container">
        <h2 className="text-center mt-4">Contact Us</h2>
        <p>
          For any queries or assistance, please feel free to reach out to us.
          You can contact our customer support team at:
        </p>
        <p className="email">support@healthcheckup.com</p>
        <p>
          We aim to respond to all inquiries within 24 hours. Whether you have
          questions about our services, need help with an appointment, or
          require any other information, our team is here to assist you.
        </p>
        <p>
          When contacting us via email, please ensure to provide the following
          details to help us serve you better:
        </p>
        <ul>
          <li>Your full name</li>
          <li>Contact number</li>
          <li>Appointment details (if applicable)</li>
          <li>Details of your inquiry or issue</li>
        </ul>
        <p>Example format for emailing us:</p>
        <pre>
          <code>
            Subject: [Your Name] - [Inquiry/Issue]
            <br />
            <br />
            Full Name: [Your Name]
            <br />
            Contact Number: [Your Contact Number]
            <br />
            Appointment Details (if applicable): [Appointment Details]
            <br />
            <br />
            [Details of your inquiry or issue]
          </code>
        </pre>
        <p>
          We appreciate your feedback and strive to provide you with the best
          possible customer service. Thank you for choosing our Online Health
          Check-up Booking Portal!
        </p>
      </div>{" "}
    </Navbar>
  );
}

export default Contact;
