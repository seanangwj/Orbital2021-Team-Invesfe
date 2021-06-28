import React from "react";
import NavBar from "./components/Navbar";
import background from "./images/jewel.jpg";
import { Route, Link } from "react-router-dom";
import "./styles/Home.css";


function Home() {
  return (
    <>
    <head>
      
      <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap" rel="stylesheet" />

</head>
    <div>
      <section className="home-header">
        <NavBar />
      </section>
      <div
        className="home-main"
        style={{
          backgroundImage: `linear-gradient(rgba(221, 224, 236, 0.3), rgba(221, 224, 236, 0.3)), url(${background})`,
        }}
      >
        <div className="text-box">
          <h1>Welcome to Invesfe</h1>
          <p>
            All-in-one online platform to formulate and create your own
            investment framework
          </p>
        </div>
      </div>
      <section class="tools">
        <h1>Financial Tools We Offer</h1>
        <h2>
          These tools will aid you in budgeting and planning your investments
        </h2>

        <div class="home-container">
          <div class="items">
            <h3>Budget Planner</h3>
            <Link to="/budget" class="hero-btn">
              CLICK HERE FOR MORE
              </Link>
          </div>
          <div class="items">
            <h3>Valuation Model</h3>
            <Link to="/intrinsicvalue" class="hero-btn">
              CLICK HERE FOR MORE
              </Link>
          </div>
          <div class="items">
            <h3>Compound Growth Calculator</h3>
            <Link to="/compoundinterest" class="hero-btn">
              CLICK HERE FOR MORE
              </Link>
          </div>
          <div class="items">
            <h3>Portfolio Allocator</h3>
            <Link to="/portfolio" class="hero-btn">
              CLICK HERE FOR MORE
              </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
  
}

export default Home;
