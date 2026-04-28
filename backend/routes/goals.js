const express = require("express");
const sql = require("mssql");
const config = require("../dbConfig");

const router = express.Router();

// GET /api/goals?category=1
// category: 1..17 (goal number)
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    const pool = await sql.connect(config);
    const request = pool.request();

    let query = `
      SELECT
        g.[ID],
        g.[category],
        g.[title_geo],
        g.[title_eng],
        g.[path_geo],
        g.[path_eng],
        gt.[title_geo] AS [category_title_geo],
        gt.[title_eng] AS [category_title_eng]
      FROM [kids].[dbo].[goals] g
      INNER JOIN [kids].[dbo].[goals_titles] gt
        ON g.[category] = gt.[category]
    `;

    if (category !== undefined) {
      const parsedCategory = Number(category);

      if (!Number.isInteger(parsedCategory) || parsedCategory < 1 || parsedCategory > 17) {
        pool.close();
        return res.status(400).json({
          error: "Invalid category. Use integer values between 1 and 17."
        });
      }

      request.input("category", sql.Int, parsedCategory);
      query += ` WHERE g.[category] = @category`;
    }

    query += ` ORDER BY g.[category], g.[ID]`;

    const result = await request.query(query);
    pool.close();

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
