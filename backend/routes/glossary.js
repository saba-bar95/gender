const express = require("express");
const sql = require("mssql");
const config = require("../dbConfig");

const router = express.Router();

// GET /api/glossary?lang=ka  OR  /api/glossary?lang=en  OR  /api/glossary (both)
router.get("/", async (req, res) => {
  try {
    const { lang } = req.query;

    const pool = await sql.connect(config);
    const request = pool.request();

    let query = `
      SELECT [ID], [lang], [text]
      FROM [kids].[dbo].[glossary]
    `;

    if (lang === "ka" || lang === "en") {
      request.input("lang", sql.NVarChar(10), lang);
      query += ` WHERE [lang] = @lang`;
    }

    query += ` ORDER BY [ID]`;

    const result = await request.query(query);
    pool.close();

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
