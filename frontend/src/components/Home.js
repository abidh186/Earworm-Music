import React from "react";
import "../styles/Home.css";
import img from "../images/img.jpeg";
const Home = () => {
  return (
    <div className="landing-page">
      <img src={img} alt="Logo" />
    </div>
  );
};

export default Home;
