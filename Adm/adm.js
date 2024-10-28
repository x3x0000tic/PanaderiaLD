const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

// Crear conexión a la base de datos
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'Prod'
});

// Conectar a la base de datos
con.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos exitosa.');
});

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta para agregar un producto
app.post('/agregarProducto', (req, res) => {
    const { nombre, precio, descripcion, id } = req.body;

    con.query('INSERT INTO producto (id, nombre, precio, descripcion) VALUES (?, ?, ?, ?)', [id, nombre, precio, descripcion], (err, result) => {
        if (err) {
            console.error('Error al agregar el producto:', err);
            return res.status(500).send('Error al agregar el producto');
        }
        res.send('Producto agregado exitosamente');
    });
});

// Ruta para obtener todos los productos
app.get('/obtenerProductos', (req, res) => {
    con.query('SELECT * FROM producto', (err, respuesta) => {
        if (err) {
            console.error('ERROR: ', err);
            return res.status(500).send('Error al obtener productos');
        }
        let userHTML = '';
        respuesta.forEach(product => {
            userHTML += `<tr><td>${product.id}</td><td>${product.nombre}</td><td>${product.precio}</td><td>${product.descripcion}</td></tr>`;
        });
        return res.send(`<table>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Descripción</th>
                </tr>
                ${userHTML}
                </table>`);
    });
});

// Ruta para borrar un producto
app.post('/borrarProducto', (req, res) => {
    const id = req.body.id; // El ID del producto a eliminar viene en el cuerpo de la solicitud
    if (!id) {
        return res.status(400).send("Se requiere el ID del producto a borrar");
    }

    con.query('DELETE FROM producto WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al borrar el producto:', err);
            return res.status(500).send("Error al borrar el producto");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Producto no encontrado");
        }
        return res.send(`Producto con ID ${id} borrado correctamente`);
    });
});

// Iniciar el servidor
app.listen(3001, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

