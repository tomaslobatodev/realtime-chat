import express from 'express'
import { createServer } from 'node:http'
import path from 'node:path'
import { Server } from 'socket.io'

const port = process.env.PORT ?? 3000

const app = express()
const httpServer = createServer(app)

app.use(express.static(path.join(process.cwd(), 'client')))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'client/index.html'))
})

const io = new Server(httpServer)

io.on('connection', (socket) => {
  socket.on('newuser', (user) => {
    io.emit('update', user + ' joined the chat')
  })

  socket.on('exit', (user) => {
    io.emit('update', user + ' left the chat')
  })

  socket.on('message', (data) => {
    io.emit('message', { msg: data.msg, user: data.user })
  })
})

httpServer.listen(port, () => console.log(`http://localhost:${port}`))
