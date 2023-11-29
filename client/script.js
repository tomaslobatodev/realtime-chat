import { io } from 'https://cdn.socket.io/4.7.2/socket.io.esm.min.js'

const socket = io()
const chat = document.querySelector('#chat')
const input = document.querySelector('#msg-input')
const sendBtn = document.querySelector('#send-btn')

let username = ''

while (username.length < 2) {
  username = prompt('Enter your username (at least 2 letters):')
}

socket.emit('newuser', username)

socket.on('update', (message) => {
  appendUpdate(message)
})

socket.on('message', ({ msg, user }) => {
  input.value = ''
  appendMessage(msg, user)
})

sendBtn.addEventListener('click', (ev) => {
  ev.preventDefault()
  socket.emit('message', { msg: input.value, user: username })
})

function appendUpdate(message) {
  const messageElement = document.createElement('div')
  messageElement.classList.add('update')
  messageElement.innerText = message
  chat.appendChild(messageElement)
}

function appendMessage(message, user) {
  const htmlMessage = `<div class="message">
  <div class= ${username === user ? 'mine' : 'others'}>
      <span>${user}</span>
      <h3>${message}</h3>  
    </div>
  </div>`

  chat.innerHTML += htmlMessage
}
