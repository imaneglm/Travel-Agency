require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getConnection } = require("./db");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

/* ======================================
   1️⃣ GET ALL TRIPS (grouped with services)
====================================== */
app.get("/api/trips", async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(
      `SELECT 
          t.trip_id,
          t.destination,
          DEREF(t.customer).full_name AS customer_name,
          DEREF(nt.COLUMN_VALUE).description AS service_description,
          DEREF(nt.COLUMN_VALUE).price AS service_price,
          DEREF(nt.COLUMN_VALUE).calculate_cost() AS final_cost_per_service,
          t.total_cost() AS total_trip_cost
       FROM C##IMANE.Trips t,
            TABLE(t.services) nt
       ORDER BY t.trip_id`
    );

    const tripsMap = {};
    result.rows.forEach((row) => {
      const tripId = row[0];
      if (!tripsMap[tripId]) {
        tripsMap[tripId] = {
          trip_id: row[0],
          destination: row[1],
          customer_name: row[2],
          total_trip_cost: row[6],
          services: [],
        };
      }
      tripsMap[tripId].services.push({
        description: row[3],
        price: row[4],
        final_cost: row[5],
      });
    });

    res.json(Object.values(tripsMap));
  } catch (err) {
    console.error("Error fetching trips:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

/* ======================================
   2️⃣ GET SINGLE TRIP BY ID
====================================== */
app.get("/api/trips/:id", async (req, res) => {
  let connection;
  const { id } = req.params;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `SELECT 
          t.trip_id,
          t.destination,
          DEREF(t.customer).full_name AS customer_name,
          DEREF(nt.COLUMN_VALUE).description AS service_description,
          DEREF(nt.COLUMN_VALUE).price AS service_price,
          DEREF(nt.COLUMN_VALUE).calculate_cost() AS final_cost_per_service,
          t.total_cost() AS total_trip_cost
       FROM C##IMANE.Trips t,
            TABLE(t.services) nt
       WHERE t.trip_id = :id`,
      { id }
    );

    if (result.rows.length === 0) return res.status(404).json({ message: "Trip not found" });

    const trip = {
      trip_id: result.rows[0][0],
      destination: result.rows[0][1],
      customer_name: result.rows[0][2],
      total_trip_cost: result.rows[0][6],
      services: [],
    };

    result.rows.forEach((row) => {
      trip.services.push({
        description: row[3],
        price: row[4],
        final_cost: row[5],
      });
    });

    res.json(trip);
  } catch (err) {
    console.error("Error fetching trip by ID:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

/* ======================================
   3️⃣ GET TRIPS BY SPECIFIC IDS (query ?ids=1,2,3)
====================================== */
app.get("/api/trips/ids", async (req, res) => {
  let connection;
  const idsParam = req.query.ids;
  if (!idsParam) return res.status(400).json({ error: "ids query param required" });

  const ids = idsParam.split(",").map((id) => Number(id.trim()));

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `SELECT 
          t.trip_id,
          t.destination,
          DEREF(t.customer).full_name AS customer_name,
          t.total_cost() AS total_trip_cost
       FROM C##IMANE.Trips t
       WHERE t.trip_id IN (${ids.join(",")})
       ORDER BY t.trip_id`
    );

    const trips = result.rows.map((row) => ({
      trip_id: row[0],
      destination: row[1],
      customer_name: row[2],
      total_trip_cost: row[3],
    }));

    res.json(trips);
  } catch (err) {
    console.error("Error fetching trips by IDs:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

/* ======================================
   Start server
====================================== */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});