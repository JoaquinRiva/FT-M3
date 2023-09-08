const express = require("express");

let publications = [];

const server = express();

server.use(express.json());



server.post("/posts", (req, res) => {
    const { author, title, contents } = req.body;

    if (!author || !title || !contents) {
        return res.status(400).json({ error: "No se recibieron los parámetros necesarios para crear la publicación" });
    }

    const newPublication = {
        id: publications.length + 1, 
        author,
        title,
        contents,
    };


 
    publications.push(newPublication);
    res.status(201).json(newPublication);
});


server.get("/posts", (req, res) => {
    const { author, title } = req.query;

    // Filtra las publicaciones que coincidan con los parámetros 'author' y 'title'
    const matchingPublications = publications.filter((publication) => {
        return publication.author === author && publication.title === title;
    });

    if (matchingPublications.length > 0) {
        // Si se encontraron coincidencias, devuelve las publicaciones
        res.json(matchingPublications);
    } else {
        // Si no se encontraron coincidencias, devuelve un JSON con un mensaje de error
        res.status(404).json({ error: "No existe ninguna publicación con dicho título y autor indicado" });
    }
});

server.get("/posts/:author", (req, res) =>{
    const {author} = req.body;
    if(!author) {
        res.status(404).json({ error: "No existe ninguna publicación del autor indicado"});
    } else{
        return author;
    }
})

server.put("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;

    if (!title || !contents) {
        return res.status(400).json({ error: "No se recibieron los parámetros necesarios para modificar la publicación" });
    }

    // Busca la publicación con el ID proporcionado
    const existingPublication = publications.find((publication) => publication.id === parseInt(id));

    if (!existingPublication) {
        return res.status(404).json({ error: "No se recibió el id correcto necesario para modificar la publicación" });
    }

    // Si existe la publicación, actualiza sus datos
    existingPublication.title = title;
    existingPublication.contents = contents;

    // Devuelve la publicación actualizada como respuesta
    res.json(existingPublication);
});


server.delete("/posts/:id", (req, res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(404).json({ error: "No se recibió el id de la publicación a eliminar" });
    }
    
    const indexToRemove = publications.findIndex((publication) => publication.id === parseInt(id));

    if (indexToRemove === -1) {
        return res.status(404).json({ error: "No se recibió el id correcto necesario para eliminar la publicación" });
    }

    // Elimina la publicación del array 'publications'
    publications.splice(indexToRemove, 1);

    // Devuelve un JSON con éxito
    res.json({ success: true });
})

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
