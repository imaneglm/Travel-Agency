require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const { getNorthConnection, getEastConnection } = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

const EUROPEAN = ['paris', 'london', 'rome', 'berlin', 'madrid', 'amsterdam'];

const TRIPS_QUERY = `
  SELECT t.trip_id, t.destination, t.region, t.total_cost,
         s.service_id, s.description, s.price
  FROM Trips t
  JOIN Trip_Services ts ON t.trip_id = ts.trip_id
  JOIN Services s       ON ts.service_id = s.service_id
  ORDER BY t.trip_id
`;

function groupTrips(rows) {
  const map = {};
  rows.forEach(([trip_id, destination, region, total_cost, service_id, description, price]) => {
    const key = trip_id + region;
    if (!map[key]) {
      map[key] = { trip_id, destination, region, total_cost, services: [] };
    }
    map[key].services.push({ service_id, description, price });
  });
  return Object.values(map);
}

/* Geting all trips (both nodes merged)  */
app.get("/api/trips", async (req, res) => {
  let connN, connE;
  try {
    [connN, connE] = await Promise.all([getNorthConnection(), getEastConnection()]);
    const [northRes, eastRes] = await Promise.all([
      connN.execute(TRIPS_QUERY),
      connE.execute(TRIPS_QUERY)
    ]);
    const allRows = [...northRes.rows, ...eastRes.rows];
    res.json(groupTrips(allRows));
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await Promise.all([connN, connE].filter(Boolean).map(c => c.close()));
  }
});

/* getting trips  by destination (smart routing)  */
app.get("/api/trips/destination/:dest", async (req, res) => {
  const dest = req.params.dest.toLowerCase();
  const getConn = EUROPEAN.includes(dest) ? getNorthConnection : getEastConnection;
  let conn;
  try {
    conn = await getConn();
    const result = await conn.execute(
      `SELECT t.trip_id, t.destination, t.region, t.total_cost,
              s.service_id, s.description, s.price
       FROM Trips t
       JOIN Trip_Services ts ON t.trip_id = ts.trip_id
       JOIN Services s       ON ts.service_id = s.service_id
       WHERE LOWER(t.destination) = :dest
       ORDER BY t.trip_id`,
      { dest }
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Destination not found" });
    res.json(groupTrips(result.rows));
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) await conn.close();
  }
});

/* getting single trip by id  ( so searches both nodes)  */
app.get("/api/trips/:id", async (req, res) => {
  const id = Number(req.params.id);
  let connN, connE;
  try {
    [connN, connE] = await Promise.all([getNorthConnection(), getEastConnection()]);
    const Q = `
      SELECT t.trip_id, t.destination, t.region, t.total_cost,
             s.service_id, s.description, s.price
      FROM Trips t
      JOIN Trip_Services ts ON t.trip_id = ts.trip_id
      JOIN Services s       ON ts.service_id = s.service_id
      WHERE t.trip_id = :id
    `;
    const [northRes, eastRes] = await Promise.all([
      connN.execute(Q, { id }),
      connE.execute(Q, { id })
    ]);
    const allRows = [...northRes.rows, ...eastRes.rows];
    if (allRows.length === 0)
      return res.status(404).json({ message: "Trip not found" });
    res.json(groupTrips(allRows)[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await Promise.all([connN, connE].filter(Boolean).map(c => c.close()));
  }
});

app.listen(3001, () => console.log("Backend running on http://localhost:3001"));