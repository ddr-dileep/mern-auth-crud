import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import AppButton from "../../components/button/AppButton";

const HomePage = () => {
  return (
    <div className="home_page">
      <h1>Welcome to Our Website</h1>
      <p>This is the home page of our website. Feel free to explore!</p>
      <AppButton>
        <Link to="/login">Get Started</Link>
      </AppButton>
    </div>
  );
};

export default HomePage;
