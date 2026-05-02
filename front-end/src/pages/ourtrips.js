import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./discoverourtrips.css";
import Background from "./background.png";
import plane from "./plane.png";
import Book from "../component/book";

function OurTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);

      try {
        let res;

        if (!id) {
          res = await axios.get("http://localhost:3001/api/trips");
        } else {
          res = await axios.get(
            `http://localhost:3001/api/trips/${id}`
          );
        }

        const data = res.data;

        const mappedTrips = Array.isArray(data)
          ? data.map((trip) => ({
              id: trip.trip_id,
              title: trip.destination,
              total_cost: trip.total_cost,
              services: trip.services || [],
            }))
          : [
              {
                id: data.trip_id,
                title: data.destination,
                total_cost: data.total_cost,
                services: data.services || [],
              },
            ];

        setTrips(mappedTrips);
      } catch (err) {
        console.error("Error fetching trips:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [id]);

  if (loading) return <p>Loading trips...</p>;

  // SHOW ALL TRIPS
  if (!id) {
    return (
      <div className="offers-page">
        <h1 className="offers-title">Our Offers</h1>

        <div className="offers-grid">
          {trips.map((trip) => (
            <div className="offer-card" key={trip.id}>
              <img src={Background} alt={trip.title} />
              <h3>{trip.title}</h3>
              <p className="price">{trip.total_cost} 00.00DA</p>
              <Link to={`/trip/${trip.id}`} className="details-btn">
                See More
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // SINGLE TRIP
  const trip = trips[0];
  if (!trip) return <h2>Trip not found</h2>;

  return (
    <div className="trip-page">
      <h1 className="trip-main-title">{trip.title}</h1>

      <div className="trip-container">
        <div className="trip-left">
          <img src={plane} alt={trip.title} />

          <div className="services-section">
            <h3>Included Services In This Trip:</h3>

            {trip.services.length > 0 ? (
              <ul>
                {trip.services.map((service, index) => (
                  <li key={index}>
                    {service.description} — Price: {service.price} DA
                  </li>
                ))}
              </ul>
            ) : (
              <p>No services available</p>
            )}
          </div>
        </div>

        <div className="trip-right">
          <div className="booking-card">
            <h2>Total Price: {trip.total_cost} DA</h2>
            <button onClick={() => setOpen(true)}>Book now</button>
          </div>

          {open && <Book closePopup={() => setOpen(false)} />}
        </div>
      </div>
    </div>
  );
}

export default OurTrips;