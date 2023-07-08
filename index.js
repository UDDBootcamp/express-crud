const express = require('express')
const fs = require('fs-extra')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Crear un CRUD que modifique el arreglo de usuarios que se encuentra en el archivo db.js

// 1. Crear un endpoint que devuelva todos los usuarios
// 2. Crear un endpoint que devuelva un usuario por id
// 3. Crear un endpoint que cree un usuario
// 4. Crear un endpoint que modifique un usuario
// 5. Crear un endpoint que elimine un usuario

// 1. Crear un endpoint que devuelva todos los usuarios
app.get('/usuarios', (req, res) => {
  fs.readFile('./db.js', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Error al leer el archivo')
    } else {
      res.send(JSON.parse(data))
    }
  }
  )
})

// 2. Crear un endpoint que devuelva un usuario por id
app.get('/usuarios/:id', (req, res) => {
  fs.readFile('./db.js', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Error al leer el archivo')
    } else {
      const usuarios = JSON.parse(data)
      const usuario = usuarios.find(usuario => usuario.id === parseInt(req.params.id))
      if (usuario) {
        res.status(200).send(usuario)
      } else {
        res.status(404).send('Usuario no encontrado')
      }
    }
  }
  )
})

// 3. Crear un endpoint que cree un usuario
app.post('/usuarios', (req, res) => {
  fs.readFile('./db.js', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Error al leer el archivo')
    } else {
      const usuarios = JSON.parse(data)
      const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        apellido: req.body.apellido
      }
      usuarios.push(nuevoUsuario)
      fs.writeFile('./db.js', JSON.stringify(usuarios), (err) => {
        if (err) {
          res.status(500).send('Error al escribir el archivo')
        } else {
          res.status(200).send('Usuario creado')
        }
      })
    }
  }
  )
})

// 4. Crear un endpoint que modifique un usuario
app.put('/usuarios/:id', (req, res) => {
  fs.readFile('./db.js', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Error al leer el archivo')
    } else {
      const usuarios = JSON.parse(data)
      const usuario = usuarios.find(usuario => usuario.id === parseInt(req.params.id))
      if (usuario) {
        usuario.nombre = req.body.nombre
        usuario.apellido = req.body.apellido
        fs.writeFile('./db.js', JSON.stringify(usuarios), (err) => {
          if (err) {
            res.status(500).send('Error al escribir el archivo')
          } else {
            res.status(200).send('Usuario modificado')
          }
        })
      } else {
        res.status(404).send('Usuario no encontrado')
      }
    }
  }
  )
})

// 5. Crear un endpoint que elimine un usuario
app.delete('/usuarios/:id', (req, res) => {
  fs.readFile('./db.js', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Error al leer el archivo')
    } else {
      const usuarios = JSON.parse(data)
      const usuario = usuarios.find(usuario => usuario.id === parseInt(req.params.id))
      if (usuario) {
        const index = usuarios.indexOf(usuario)
        usuarios.splice(index, 1)
        fs.writeFile('./db.js', JSON.stringify(usuarios), (err) => {
          if (err) {
            res.status(500).send('Error al escribir el archivo')
          } else {
            res.status(200).send('Usuario eliminado')
          }
        })
      } else {
        res.status(404).send('Usuario no encontrado')
      }
    }
  }
  )
})


app.listen(port ,() => {
  console.log(`Servidor escuchando en puerto ${port}`)
})