import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'reactmysql'
})
app.get('/', (req, res) =>{
    const sql = "SELECT * FROM students"
    db.query(sql, (err, result) =>{
        if(err) return res.json({ message: "Error inside server"});
        return res.json(result);
    })
})

app.post('/student', (req, res) =>{
    const sql = "INSERT INTO students (`nom`,`prenom`,`telephone`) VALUES (?)";
    const values = [
        req.body.nom,
        req.body.prenom,
        req.body.telephone
    ]
    db.query(sql, [values], (err, result) =>{
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.get('/read/:id', (req, res) =>{
    const sql = "SELECT * FROM students WHERE id = ?"
    const id = req.params.id
    db.query(sql,[id], (err, result) =>{
        if(err) return res.json({ message: "Error inside server"});
        return res.json(result);
    })
})

app.put('/edit/:id', (req, res) =>{
    const sql = "UPDATE students SET `nom`=?, `prenom`=?, `telephone`=? WHERE id=?"
    const id = req.params.id
    db.query(sql, [req.body.nom, req.body.prenom, req.body.telephone, id], (err, result) =>{
        if(err) return res.json({ message: "Error inside server"});
        return res.json(result);
    })
})

app.delete('/delete/:id', (req, res) =>{
    const sql = "DELETE FROM students WHERE id=?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) =>{
        if(err) return res.json({ message: "Error inside server"});
        return res.json(result);
    })
})

app.listen(8081,()=>{
    console.log('listening')
})