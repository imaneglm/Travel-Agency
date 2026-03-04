//about us page that show all details and information about his agency 
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./aboutus.css";

// Leaflet map pinned on random location on batna 
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});
// Batna coordinates
const batnaPosition = [35.5556, 6.1725];

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>ABOUT US</h1>
        <p>
          We are a professional company based in Algeria providing high
          quality services and innovative solutions.
        </p>
      </div>
      <div className="about-content">
        <div className="about-card">
          <h3>Our Mission</h3>
          <p>
            To deliver modern digital solutions and help businesses grow
            through technology and innovation.
          </p>
        </div>
        <div className="about-card">
          <h3>Our Vision</h3>
          <p>
            To become one of the leading tech companies in Algeria and
            internationally.
          </p>
        </div>
        <div className="about-card">
          <h3>Our Location</h3>
          <p>Batna, Algeria</p>
        </div>
      </div>
      <div className="map-section" style={{ height: "400px", marginTop: "20px" }}>
        <MapContainer center={batnaPosition} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={batnaPosition}>
            <Popup>We are located in Batna 🇩🇿</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
export default AboutUs;