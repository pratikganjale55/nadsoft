const express = require("express") ;
const pool = require("../database/db");
const studentRouter = express() ;

studentRouter.post('/students', async (req, res) => {
    const { name, email, age, parent_id } = req.body;
    console.log(req.body)

    try {
        const existingStudent = await pool.query('SELECT * FROM students WHERE email = $1', [email]);

        if (existingStudent.rows.length > 0) {
            return res.status(400).json({ error: 'Email already exists. Please use a different email.' });
        }

        const result = await pool.query(
            'INSERT INTO students (name, email, age, parent_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, age, parent_id]
        );
        res.status(201).json(result.rows[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


studentRouter.get('/students', async (req, res) => {
    let { page, limit } = req.query;
    console.log(page, limit)
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const offset = (page - 1) * limit;

    try {
        const students = await pool.query(
            'SELECT * FROM students ORDER BY id LIMIT $1 OFFSET $2',
            [limit, offset]
        );

        const total = await pool.query('SELECT COUNT(*) FROM students');

        res.json({
            total_students: parseInt(total.rows[0].count), 
            current_page: page,
            per_page: limit,
            total_pages: Math.ceil(total.rows[0].count / limit),
            students: students.rows 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


studentRouter.get('/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await pool.query('SELECT * FROM students WHERE id = $1', [id]);

        if (student.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(student.rows[0]); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
studentRouter.put('/students/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, age, parent_id } = req.body;

    try {
      
        const studentExists = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
        if (studentExists.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

      
        const existingEmail = await pool.query(
            'SELECT * FROM students WHERE email = $1 AND id <> $2',
            [email, id]
        );

        if (existingEmail.rows.length > 0) {
            return res.status(400).json({ error: 'Email already exists. Please use a different email.' });
        }

       
        const result = await pool.query(
            `UPDATE students 
             SET name = $1, email = $2, age = $3, parent_id = $4 
             WHERE id = $5 RETURNING *`,
            [name, email, age, parent_id, id]
        );

        res.json({ message: 'Student updated successfully', student: result.rows[0] });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

studentRouter.delete('/students/:id', async (req, res) => {
    const { id } = req.params;

    try {
       
        const student = await pool.query('SELECT * FROM students WHERE id = $1', [id]);

        if (student.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

       
        await pool.query('DELETE FROM students WHERE id = $1', [id]);

        res.json({ message: 'Student deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = studentRouter ;





