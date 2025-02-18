# Online Health Checkup Booking Portal 🏥📅

## Project Overview

The **Online Health Checkup Booking Portal** is a MERN (MongoDB, Express.js, React.js, Node.js) project designed to provide users with a convenient and efficient platform for booking health checkup appointments. The portal allows users to register, log in, browse available doctors, book appointments, and receive timely notifications regarding their appointments. In addition, it features an administrative panel for managing doctor requests and overseeing the system. 🩺

## Project Description 💻

The **Online Health Checkup Booking Portal** offers a user-friendly and automated system for booking health checkup appointments. Users can:

- **Register and Login:** Access their personal dashboard.
- **Browse Doctors:** View a list of doctors based on specialization, availability, and patient reviews.
- **Book Appointments:** Select and schedule appointments with healthcare providers.
- **Receive Notifications:** Get timely updates about their appointments through the system.

The portal also includes an **Admin Panel** that allows administrators to approve doctor requests and manage the overall system. This ensures only verified healthcare professionals can accept appointments.

## Problem Statement ⚠️

The traditional process of booking health checkup appointments is often time-consuming and inconvenient for both users and healthcare providers. Users face difficulties in finding suitable doctors, booking appointments, and receiving timely notifications. Healthcare providers also struggle with managing appointments and communicating effectively with their patients. These challenges necessitate a more efficient and automated system.

## Existing System 🏚️

Currently, appointment booking for health checkups relies on manual methods such as phone calls or in-person visits. Users must contact healthcare providers, inquire about available time slots, and then schedule appointments manually. This system is prone to errors, delays, and miscommunication, and it lacks automation and real-time availability.

## Limitations of Existing System 🚫

The limitations of the existing system include:

- **Time-consuming process**: Users spend a lot of time finding suitable doctors and booking appointments.
- **Lack of real-time availability**: Users may not always have access to the most up-to-date availability.
- **Limited communication**: Miscommunication due to reliance on phone calls and in-person interactions.
- **Manual approval process**: Healthcare providers must manually approve requests, leading to delays.
- **Absence of a user-friendly interface**: Existing systems may lack an intuitive, seamless user experience.

## Proposed System 💡

The proposed **Online Health Checkup Booking Portal** addresses these limitations by providing an automated and user-friendly platform. Key features include:

- **Doctor Database**: Users can browse and select doctors based on specialization, availability, and reviews.
- **Automated Appointment Booking**: Users can book appointments without manual intervention.
- **Notifications**: Both users and doctors receive timely updates about appointments.
- **Admin Panel**: Administrators can approve doctor requests and manage the system.

The system provides a streamlined, efficient way to book health checkups and manage appointments.

## Objectives 🎯

The objectives of the **Online Health Checkup Booking Portal** are as follows:

- **Provide a user-friendly platform** for booking health checkup appointments.
- **Allow users to browse and select doctors** based on specialization, availability, and reviews.
- **Automate the appointment booking process**, eliminating the need for manual intervention.
- **Implement a notification system** to keep users and doctors informed about appointment updates.
- **Enable efficient administrative management**, allowing admins to approve doctor requests and oversee the system.

## Benefits of Proposed System 💥

The **Online Health Checkup Booking Portal** offers several benefits over the existing system, including:

- **Time-saving**: Users can easily find and book appointments with suitable doctors in a streamlined process.
- **Real-time availability**: Access to up-to-date information about doctor availability for more accurate scheduling.
- **Improved communication**: Notifications reduce the chances of miscommunication between users and doctors.
- **Efficient administrative management**: Admins can manage doctor requests and system oversight more effectively.
- **Enhanced user experience**: The automated processes and user-friendly interface improve the overall experience for both users and doctors.

## Installation Guide

**Follow these steps** to set up and run the project on your local machine.

**1. Open in VSCode**
Open Visual Studio Code and press "Shift + ctrl + `" to open New terminal.

**2. Clone the repository**
- Clone Github repo project source code 
```bash
git clone https://github.com/CV0412/MERN-Project-OnlineHealthCheckupBookingPortal.git
```
- Change the directory into cloned project
```bash
cd MERN-Project-OnlineHealthCheckupBookingPortal
```

**Install the necessary npm packages** for the server-side by running:
- This will download and install all required dependencies listed in the package.json file and create a node_modules folder in the server directory.
```bash
npm i
```

**Client-side (Frontend)**
- After installing the server-side dependencies, navigate to the client directory by running:
```bash
cd client
```

- Install the required npm packages in client folder for React by running:
```bash
npm i
```
This will install the necessary packages for the frontend.

After the installation is complete, go back to the main folder by running:
```bash
cd ..
```

**3. Setup Environment Variables**
- Edit a .env file in the Main directory with the following variables:

Edit this .env values
```text
PORT=8080
MONGODB_URL=mongodb://127.0.0.1:27017/<DATABASE NAME >
JWT_SECRET=<JWT TOKEN VALUE>
```

**4. Set Up MongoDB**
- Before running the application, ensure you have MongoDB installed and configured on your local system.

## Install MongoDB on Your System
Download and install MongoDB from the official MongoDB website.

**Follow the installation instructions** for your operating system.

Once installed, start the MongoDB service:

--> On Windows, use the MongoDB Compass application or start the MongoDB service via command prompt.

--> On macOS, run brew services start mongodb-community if you used Homebrew for installation.

**Create an Empty Database**
**Open the MongoDB shell or MongoDB Compass.**
- Create a new database by running the following command in the MongoDB shell:
```bash
use <DATABASE NAME >
```
This will create an empty database named onlineFurnitureShop.

- If using MongoDB Compass, create a new database via the GUI interface.


**4. Run the Application**
To run the website:
- In the terminal, navigate to the root directory of the project.
- Run the following command to start both the server and the React application concurrently:
```bash
npm run dev
```
This will start the server and the frontend React app. You can access the website on your default browser at http://localhost:3000.

## To stop the website:
- In the terminal of VScode press "Ctrl + C".
