const express = require("express");
const sql = require("mssql");
const config = require("../dbConfig");

const router = express.Router();

// GET /api/files?category=1&sub_category=2
router.get("/", async (req, res) => {
  try {
    const { category, sub_category: subCategory } = req.query;

    const pool = await sql.connect(config);
    const request = pool.request();

    let query = `
      SELECT
        [ID],
        [category],
        [sub_category],
        [title_geo],
        [title_eng],
        [path_geo],
        [path_eng],
        [chartdata]
      FROM [kids].[dbo].[files]
    `;

    const whereClauses = [];

    if (category !== undefined) {
      const parsedCategory = Number(category);

      if (!Number.isInteger(parsedCategory) || parsedCategory < 1) {
        pool.close();
        return res.status(400).json({
          error: "Invalid category. Use a positive integer value.",
        });
      }

      request.input("category", sql.Int, parsedCategory);
      whereClauses.push("[category] = @category");
    }

    if (subCategory !== undefined) {
      const parsedSubCategory = Number(subCategory);

      if (!Number.isInteger(parsedSubCategory) || parsedSubCategory < 1) {
        pool.close();
        return res.status(400).json({
          error: "Invalid sub_category. Use a positive integer value.",
        });
      }

      request.input("sub_category", sql.Int, parsedSubCategory);
      whereClauses.push("[sub_category] = @sub_category");
    }

    if (whereClauses.length > 0) {
      query += ` WHERE ${whereClauses.join(" AND ")}`;
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