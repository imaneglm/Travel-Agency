//  the pop-up book form when clicking Book 
import React, { useState } from "react";
import "./book.css";

function Book({ closePopup }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    travelers: 1,
    date: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
    alert("Thank you! Your booking request has been submitted.");
    closePopup();
  };

  return (
    <div className="booking-overlay">
      <div className="booking-popup">
        <button className="booking-close-btn" onClick={closePopup}>&times;</button>
        <h2 className="booking-title">Book Your Trip</h2>
        <p className="booking-subtitle">Fill out the form below to reserve your spot!</p>
        <form onSubmit={handleSubmit} className="booking-form">
          <input type="text" name="name" placeholder="Enter Your Full Name"value={formData.name}onChange={handleChange} required />
          <input type="email" name="email" placeholder="Enter Your Email Address" value={formData.email} onChange={handleChange} required />
          <input type="tel"name="phone" placeholder="Enter Your Phone Number" value={formData.phone || ""}onChange={handleChange}pattern="[0-9]{10}"title="Please enter exactly 10 digits"required />
          <input type="number" name="travelers"placeholder="Number of Travelers" min="1" value={formData.travelers} onChange={handleChange} required />
          <button type="submit" className="booking-submit-btn"> Submit Booking</button>
        </form>
      </div>
    </div>
  );
}
export default Book;