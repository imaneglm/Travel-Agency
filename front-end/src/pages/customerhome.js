//Home page with all diffrent section it has 
import React, { useEffect, useState } from "react";
import "./customerhome.css";
import heroimag from "./heroimag.png";
import { Link } from "react-router-dom";
import background from "./background.png";
import axios from "axios";

function CustomerHome() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  // Animate services section
  useEffect(() => {
    const bars = document.querySelectorAll(".bar-fill");
    const values = [94, 87, 48, 51];
    bars.forEach((bar, index) => {
      bar.style.width = values[index] + "%";
    });
  }, []);

  // this fetch trips for "Best Offer" section (random i selected  1,2,3)
  useEffect(() => {
    const fetchBestOffers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/trips");
        const bestTrips = res.data
          .filter((trip) => [1, 2, 3].includes(trip.trip_id))
          .map((trip) => ({
            trip_id: trip.trip_id,
            destination: trip.destination,
            total_trip_cost: trip.total_trip_cost,
          }));
        setTrips(bestTrips);
      } catch (err) {
        console.error("Error fetching best offers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBestOffers();
  }, []);

  return (
    <div className="customer-home">
      {/* Hero Section */}
      <section className="hero">
        <img src={heroimag} alt="Travel" className="hero-image" />
        <div className="hero-text">
          <h1>Explore The World With Us</h1>
          <h2>Travel More...Worry Less!</h2>
          <h3>Your Journey Begins Here.</h3>
          <p>Unlock Your Dream Vacation: Explore Our Exclusive Trips Packages </p>
          <p className="hero-trust">
            ⭐ 4 Stars Rating | 🌍 10,000+ Happy Travelers | 24/7 Support
          </p>
          <p className="hero-link">
            <Link to="/about">Learn More About Us</Link>
          </p>
        </div>
      </section>
      {/* Our Services Section */}
      <section className="Ourservices">
        <h2>Why We Are The Best?!</h2>
        <p>
          At TravelAgency, we create unforgettable experiences with unbeatable
          prices, expert guidance, and personalized support.
        </p>
        <div className="service-cards">
          <div className="card">
            <h3>Amazing Offers</h3>
            <p>Get the best deals on trips, flights, and accommodations.</p>
          </div>
          <div className="card">
            <h3>Book Flights</h3>
            <p>Fast and secure flight booking to destinations worldwide.</p>
          </div>
          <div className="card">
            <h3>Hotel Booking</h3>
            <p>Choose from top hotels and resorts for a comfortable stay.</p>
          </div>
          <div className="card">
            <h3>Exclusive Services</h3>
            <p>Enjoy personalized support and premium travel experiences.</p>
          </div>
        </div>
      </section>
      {/*  Best Offers Section */}
      <section className="vacation-packages">
        <h2>Our Best Offer For This Month</h2>
        <div className="trip-cards">
          {loading ? (
            <p>Loading offers...</p>
          ) : trips.length === 0 ? (
            <p>No offers available this month.</p>
          ) : (
            trips.map((trip) => (
              <div className="trip-card" key={trip.trip_id}>
                <img src={background} alt={trip.destination} />
                <h3>{trip.destination}</h3>
                <p>Total Price: ${trip.total_trip_cost}00.00DA</p>
              </div>
            ))
          )}
        </div>
        <div className="detail-btn">
          <Link to="/our-trips"><button>See More</button></Link>
        </div>
      </section>
      {/* Feedback Section */}
      <section className="Feedback">
        <h2>Happy Customers</h2>
        <p></p>
        <p>⭐ 4 Stars Rating | 🌍 10,000+ Happy Travelers | 24/7 Support</p>
      </section>
    </div>
  );
}
export default CustomerHome;