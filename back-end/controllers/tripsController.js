const { getConnection } = require("../config/db");

async function getAllTrips(req, res) {
  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(`
      SELECT trip_id, destination, customer, services, price, description, departure_date, duration
      FROM trips
    `);

    res.json(result.rows);
  } catch (err) {
    // Log full Oracle error
    console.error("Database query failed:", err); 
    res.status(500).send("Database error");
  } finally {
    if (connection) {
      try { await connection.close(); } catch (err) { console.error(err); }
    }
  }
}

module.exports = { getAllTrips };