import { fileURLToPath } from 'url'
import path from 'path'

import fs from 'fs'
import http, { request } from "http"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let server = http.createServer(function(request, response) {
  let indexPage = fs.readFileSync(path.join(__dirname, "obrat.html"))
 
  if (request.url == "/") {
    response.writeHead(200, { "Content-Type": "text/html" })
    response.end(indexPage)
  }

  else if (request.url == "/message" && request.method == "POST") {
    let data = ""
    request.on("data", function(chunk) {
      data += chunk;
    })
    request.on("end", function() {
      let search = new URLSearchParams(data)
      let name = search.get("firstName")
      let email = search.get("gmail")
      let message = search.get("message")
    
    
 
      fs.appendFileSync(path.join(__dirname, "admin.txt"), `\nПолучено новое сообщение!(\n
          Имя: ${name},\n
          Почта: ${email},\n
          Сообщение: ${message};\n
      )\n`)
    })
    response.writeHead(302, { "Location": "/" })
    response.end("Sent successfully!")
   

  
  }


  else{
    response.writeHead(200, { "Content-Type": "text/html" })
    response.end(`<div style="display:flex; width:100%;flex-direction:column; align-items:center;"><h1>404</h1><br><hr style="width:100%; background:black; color:black;"><br><h1>Page not found</h1></div>`)
  }
})

server.listen(3000)