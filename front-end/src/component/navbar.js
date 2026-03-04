// the navigation bar of the website 
import { Link } from "react-router-dom";
import { GiCommercialAirplane } from "react-icons/gi";
import { IoMdSearch } from "react-icons/io";
import "./navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <GiCommercialAirplane className="logo-icon" />
        <h1>TravelAgency</h1>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/our-trips">Our Trips</Link>
        <Link to="/about">About Us</Link>
      </nav>
      <div className="searchbar">
        <IoMdSearch className="search-icon" />
        <input type="text" placeholder="Search..." />
      </div>
    </header>
  );
}
export default Navbar;