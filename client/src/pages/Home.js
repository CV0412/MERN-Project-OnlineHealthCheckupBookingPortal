import React from "react";
import Navbar from "../components/HomeLayout/Navbar";
import generalCheckupsImage from "./../images/genrealcheckup.jpg";
import specializedCheckupsImage from "./../images/SpecializedCheck-ups.jpg";
// import dentalCheckupsImage from "./../images/DentalCheck-ups.jpg";
import insuranceImage from "./../images/insurance.jpg";
// import healthTipsImage from "./../images/health-tips.jpg";

const Home = () => {
  const sections = [
    {
      title: "General Check-ups",
      imageUrl: generalCheckupsImage,
      description: "Book an appointment for general health check-ups.",
    },
    {
      title: "Specialized Check-ups",
      imageUrl: specializedCheckupsImage,
      description: "Book an appointment for specialized health check-ups.",
    },
    // {
    //   title: "Dental Check-ups",
    //   imageUrl: dentalCheckupsImage,
    //   description: "Book an appointment for dental health check-ups.",
    // },
    // {
    //   title: "Health Tips",
    //   imageUrl: healthTipsImage,
    //   description: "Read our latest health tips and advice.",
    // },
  ];

  const insurance = [
    {
      title: "Insurance",
      imageUrl: insuranceImage,
      description: "Learn about our insurance coverage options.",
    },
  ];

  return (
    <Navbar>
      <div className="container">
        <h1 className="mt-5 mb-4">
          Welcome to the Online Health Check-up Booking Portal!
        </h1>
        <div className="row">
          {sections.map((section) => (
            <div key={section.title} className="col-md-4">
              <div className="card mb-4">
                <img
                  height={250}
                  src={section.imageUrl}
                  alt={section.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h2 className="card-title">{section.title}</h2>
                  <p className="card-text">{section.description}</p>
                  <a href="/login" className="btn btn-info text-light">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
          {insurance.map((section) => (
            <div key={section.title} className="col-md-4">
              <div className="card mb-4">
                <img
                  height={250}
                  src={section.imageUrl}
                  alt={section.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h2 className="card-title">{section.title}</h2>
                  <p className="card-text">{section.description}</p>
                  <a href="/insurance" className="btn btn-info text-light">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Navbar>
  );
};

export default Home;
