var fs = require("fs");
var http = require("http");
/* ⚠️ NO MODIFICAR NADA POR ENCIMA DE ESTA LÍNEA ⚠️ */
/* AQUÍ DEBAJO PUEDES ESCRIBIR LA CONSTANTE DEL PUERTO */
const PORT = 3001;

http.createServer((req, res) => {
  console.log(`Server raised in port ${PORT}`);
  if(req.url === '/api'){
    fs.readFile('./utils/dogsData.json', (err, data) => {
      if(err) {
        res.writeHead(404, {"Content-type": "text/plain"})
        return res.end("json not found")
      }
      else {
        res.writeHead(200, {"Conten-type": "application/json"})
        return res.end(data)
      }
    })
    }
    return;
}).listen(PORT, 'localhost')






/* ⚠️ LA LÍNEA SIGUIENTE TIENE QUE QUEDAR COMO ESTÁ PARA PODER EXPORTAR EL SERVIDOR ⚠️ */
module.exports =
  /* AQUÍ DEBAJO YA PUEDES ESCRIBIR TÚ CÓDIGO REEMPLAZANDO EL VALOR DE NULL POR EL SERVIDOR */
  null;
