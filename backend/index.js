const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const config = require("./dbConfig");

const filesRoute = require("./routes/files");
const glossaryRoute = require("./routes/glossary");
const goalsRoute = require("./routes/goals");


const app = express();
const PORT = process.env.PORT || 3001;

// ✅ IMPORTANT — allow your frontend domain
const corsOptions = {
  origin: [
    "https://kids.geostat.ge",
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

// routes
app.use("/api/files", filesRoute);
app.use("/api/glossary", glossaryRoute);
app.use("/api/goals", goalsRoute);

// health check with database status
app.get("/", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    await pool.request().query("SELECT 1");
    pool.close();

    res.json({
      status: "OK",
      message: "API working",
      database: "Connected",
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(503).json({
      status: "ERROR",
      message: "API working but database connection failed",
      database: "Disconnected",
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
