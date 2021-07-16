const socket = io('http://localhost:8000');

const form = document.getElementById("form_container");
const messageInput = document.getElementById("Messageinp");
const messageContainer = document.querySelector(".container");
var joined = new Audio('join.mp3');
var msg = new Audio('tune.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';

})
const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
    joined.play();

});

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left');
    msg.play();
});

socket.on('left', name => {
    append(`${name} left the chat`, 'right');
    joined.play();
})
