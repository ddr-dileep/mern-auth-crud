import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { AppButton, PageTitle } from "./../../components";

const HomePage = () => {
  return (
    <div className="home_page">
      <PageTitle title="Auth - Home" />
      <h1>Welcome to Our Website</h1>
      <p>This is the home page of our website. Feel free to explore!</p>
      <AppButton>
        <Link to="/login">Get Started</Link>
      </AppButton>
    </div>
  );
};

export default HomePage;
