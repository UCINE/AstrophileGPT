document.addEventListener('DOMContentLoaded', function () {
    const userInput = document.getElementById('user-input');
    userInput.addEventListener('keypress', async function (e) {
        if (e.key === 'Enter') {
            let inputText = userInput.value;
            userInput.value = '';
            addMessageToChat('You', inputText);
            try {
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message: inputText })
                });
                const data = await response.json();
                addMessageToChat('Astrophile', data.reply);
            } catch (error) {
                console.error('Error:', error);
                addMessageToChat('Astrophile', 'Sorry, an error occurred.');
            }
        }
    });

    function addMessageToChat(sender, message) {
        const chatContainer = document.getElementById('chat-container');
        const newMessageDiv = document.createElement('div');
        newMessageDiv.innerHTML = `<b>${sender}:</b> ${message}`;
        chatContainer.appendChild(newMessageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});
