import { io } from 'https://cdn.socket.io/4.7.2/socket.io.esm.min.js'

const socket = io()
const chat = document.querySelector('#chat')
const input = document.querySelector('#msg-input')
const sendBtn = document.querySelector('#send-btn')
const userInput = document.querySelector('#user-input')
const userBtn = document.querySelector('#user-btn')
const dialog = document.querySelector('dialog')

let username = ''

userBtn.addEventListener('click', (ev) => {
  ev.preventDefault()
  username = userInput.value

  socket.emit('newuser', username)
  dialog.classList.add('closed')
})

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
    <div class=${username === user ? 'mine' : 'others'}>
        <span>${user}</span>
        <h3>${message}</h3>  
      </div>
    </div>`

  chat.innerHTML += htmlMessage
}
