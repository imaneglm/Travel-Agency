// the footer component for all the pages 
import "./footer.css";
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h3>TravelAgency</h3>
        <p> Email:{" "}<a href="mailto:travelagency@email.com">travelagency@email.com</a></p>
        <p>Phone:{" "}<a href="tel:+213551234567"> +213 55 123 4567</a></p>
        <p>Algeria</p>
      </div>
      <div className="footer-center">
         <h4>Quick Links</h4>
         <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/our-trips">Our Offers</Link></li>
            <li><Link to="/about">About Us</Link></li>
         </ul>
      </div>
      <div className="footer-right">
        <h4>Follow Us</h4>
        <div className="footer-social">
          <a href="https://www.facebook.com"target="_blank"rel="noopener noreferrer"> <FaFacebook /></a>
          <a href="https://www.twitter.com" target="_blank"rel="noopener noreferrer"><IoLogoTwitter /> </a>
          <a href="https://www.instagram.com"target="_blank"rel="noopener noreferrer"><FaInstagramSquare /></a>
        </div>
      </div>
       <div className="footer-bottom">
         <p>&copy; 2026 TravelAgency. All Rights Reserved.</p>
       </div>
    </footer>
  );
};
export default Footer;