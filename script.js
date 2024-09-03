document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita a quebra de linha no campo de entrada
        sendMessage();
    }
});

document.getElementById('search-input').addEventListener('input', filterMessages);

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user', 'Você');
        input.value = '';
        adjustHeight(); // Recalcula a altura após o envio
        setTimeout(() => {
            addMessage('Esta é uma resposta automática.', 'bot', 'Bot');
        }, 1000);
    }
}

function addMessage(text, sender, username) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    
    const usernameElement = document.createElement('div');
    usernameElement.classList.add('username');
    usernameElement.textContent = username;
    
    const messageContent = document.createElement('div');
    messageContent.classList.add('message');
    messageContent.textContent = text;
    
    messageElement.appendChild(usernameElement);
    messageElement.appendChild(messageContent);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function filterMessages() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const messages = document.querySelectorAll('.chat-message');
    
    messages.forEach(message => {
        const messageText = message.querySelector('.message').textContent.toLowerCase();
        if (messageText.includes(query)) {
            message.style.display = ''; // Exibe a mensagem
        } else {
            message.style.display = 'none'; // Oculta a mensagem
        }
    });
}

function adjustHeight() {
    const input = document.getElementById('message-input');
    input.style.height = 'auto'; // Reseta a altura para calcular a nova
    input.style.height = `${input.scrollHeight}px`; // Define a altura com base no conteúdo
}

// Adiciona um ouvinte de eventos para ajustar a altura ao digitar
document.getElementById('message-input').addEventListener('input', adjustHeight);

// Adiciona um ouvinte de eventos para definir a altura inicial
window.addEventListener('load', adjustHeight);
