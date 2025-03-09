const express = require("express");
const cors = require("cors");
const mysql = require("mysql")
const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'estudiantesweb',
    password: 'admin12345',
    database: 'cursoweb',
    port: 3306
})
connection.connect(err=>{
    if(err) throw err;
    console.log("conectado a mysql")
})


const app = express();
app.use(cors());
app.use(express.json());

app.listen(3002, () => {console.log("El servidor esta corriendo por el puerto 3002");
});

app.get("/obtener", (req,res)=>{
    connection.query('SELECT * FROM reyes', (err,result)=>{
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

app.post("/agregar",(req,res)=>{
    const{ asignatura, nota } = req.body;
    connection.query('INSERT INTO reyes ( asignatura, nota) VALUES(?,?)',
        [asignatura, nota], (err,result)=>{
            //if(err) throw err; 
            res.json({mensaje:"Person added"});

        });
    
});

app.put('/actualizar/:id', (req,res)=>{ 
    const {id} = req.params
    const{asignatura, nota} = req.body;
    console.log(asignatura, nota)
    connection.query('UPDATE reyes set asignatura=?, nota=? where id = ?',
        [asignatura, nota, id], (err,result) =>{
            res.json({mensaje: "cambio concretado"})

        })

})

app.delete('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM reyes WHERE id=?', 
    [id], (err) => {
        if (err) throw err;
        res.json({message: 'Estudiante eliminado'});
});
});