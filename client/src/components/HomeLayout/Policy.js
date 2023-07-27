import React from "react";
import Navbar from "./Navbar";

function Policy() {
  return (
    <Navbar>
      <div className="container">
        <h1 className="text-center mt-4">Privacy Policy</h1>
        <p>
          At the Online Health Check-up Booking Portal, we take your privacy
          seriously. This Privacy Policy outlines how we collect, use, and
          protect your personal information when you use our services.
        </p>
        <h2>Information We Collect</h2>
        <p>
          When you use our Online Health Check-up Booking Portal, we may collect
          the following information:
        </p>
        <ul>
          <li>
            Personal information such as your name, email address, and contact
            number.
          </li>
          <li>
            Demographic information such as your age, gender, and location.
          </li>
          <li>
            Information related to your health check-up appointments and medical
            history.
          </li>
        </ul>
        <h2>How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul>
          <li>
            Facilitate the booking and management of your health check-up
            appointments.
          </li>
          <li>
            Provide personalized recommendations and suggestions based on your
            health needs.
          </li>
          <li>Improve our services and enhance the user experience.</li>
          <li>
            Respond to your inquiries, provide support, and communicate
            important updates.
          </li>
          <li>
            Comply with legal obligations and protect the rights and safety of
            users.
          </li>
        </ul>
        <h2>Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your
          personal information from unauthorized access, alteration, or
          disclosure. However, please be aware that no method of transmission
          over the internet or electronic storage is completely secure.
        </p>
        <h2>Third-Party Services</h2>
        <p>
          We may utilize third-party services to facilitate certain functions of
          the Online Health Check-up Booking Portal, such as payment processing
          and analytics. These third-party services have their own privacy
          policies and practices, and we encourage you to review them.
        </p>
        <h2>Updates to the Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be reflected on this page, and we encourage you to review the Privacy
          Policy periodically.
        </p>
        <h2>Contact Us</h2>
        <p>
          If you have any questions or concerns regarding our Privacy Policy or
          the handling of your personal information, please contact us at
          support@healthcheckup.com.
        </p>
      </div>{" "}
    </Navbar>
  );
}

export default Policy;
