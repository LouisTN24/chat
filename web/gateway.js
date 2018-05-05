document.getElementById('login').addEventListener('submit', (e) => {
  e.preventDefault()

  axios.post('http://localhost:8080/login', {
    email: document.getElementById('login-email').value,
    password: document.getElementById('login-password').value       
  }).then(response => {
    localStorage.user = response.data.name
    hideModal('#login-modal')
  }).catch(response => {
    let span = document.createElement('span')
    span.style.color = 'red'
    span.innerText = 'Login failed'
    document.getElementById('login').appendChild(span)
  })
})

document.getElementById('register').addEventListener('submit', (e) => {
  e.preventDefault()

  axios.post('http://localhost:8080/register', {
    email: document.getElementById('register-email').value,
    name: document.getElementById('register-name').value,
    password: document.getElementById('register-password').value       
  }).then(response => {
    localStorage.user = document.getElementById('register-name').value
  }).catch(response => {
    let span = document.createElement('span')
    span.style.color = 'red'
    span.innerText = 'Registration failed'
    document.getElementById('register').appendChild(span)
  })
})

document.getElementById('chat').addEventListener('submit', (e) => {
  e.preventDefault()

  axios.post('http://localhost:8080/chat', {
    name: localStorage.user,
    message: document.getElementById('chat-message').value
  }).then(response => {
    document.getElementById('chat-message').value = ''
    loadAllMessages()
  }).catch(response => {
    //
  })
})

function loadAllMessages () {
  axios.get('http://localhost:8080/chat')
    .then(response => {
      printMessages(response.data)
    }).catch(response => {
      //
    })
}

function printMessages (messages) {
  const box = document.getElementById('messages')
  box.innerHTML = ''

  for (message of messages) {
    let li = document.createElement('li')
    li.innerHTML = `<b>${message.sender}:</b> ${message.body}`
    box.appendChild(li)
  }
}

window.onload = () => {
  loadAllMessages()
}