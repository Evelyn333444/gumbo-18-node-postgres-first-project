import { Pool } from "pg";
import express from "express";

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'electronic',
    password: 'testtest',
    port: 5432,
});

const app = express();
app.use

app.get("/api/items", async (req, res) => {
    try {
        const result = await  db.query(
            'SELECT * FROM items WHERE is_active = true ORDER BY name'
        );
        res.json(result.rows);
    } catch(err){
        console.error(err);
        res.status(500).json({error: "Database query failed"});
    }
});

app.get("/api/items/:id", async (req, res) => {
    try {
        const result = await  db.query( "SELECT * FROM items WHERE id = $1",
            [req.params.id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "product not found" });
        }
        res.json(result.rows[0]);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
});

app.listen(3000, () => console.log("Server is running on port 3000"));

