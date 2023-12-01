const socket = io()
let username = ''

Swal.fire({
  title: 'Iniciar sesion',
  input: 'text',
  text: 'Ingresa el usuario para identificarte en el chat',
  inputValidator: (value) => {
    return !value && 'Debes ingresar un usuario'
  },
  allowOutsideClick: false,
}).then((result) => {
  username = result.value
  socket.emit('new-user', username)
})

const chatInput = document.getElementById('chat-input')

chatInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const message = chatInput.value
    if (message.trim().length > 0) {
      socket.emit('chat-message', {
        username: username,
        message: message,
      })
      chatInput.value = ''
    }
  }
})

const messagesPanel = document.getElementById('messages-panel')

socket.on('messages', (data) => {
  let messages = ''
  data.forEach((message) => {
    messages += `<b>${message.username}:</b></br>${message.message}</br>`
  })
  messagesPanel.innerHTML = messages
})

socket.on('new-user', (username) => {
  Swal.fire({
    title: `${username} se ha conectado al chat`,
    toast: true,
    position: 'top-end',
  })
})
