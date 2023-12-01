const userInput = document.getElementById('user-input');
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let inputText = userInput.value;
        userInput.value = '';
        addMessageToChat('You', inputText);
        getAIResponse(inputText);
    }
});

function addMessageToChat(sender, message) {
    let chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML += `<b>${sender}:</b> ${message}<br/>`;
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function getAIResponse(message) {
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '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'
        },
        body: JSON.stringify({
            prompt: message,
            max_tokens: 150
        })
    });
    const data = await response.json();
    addMessageToChat('AI', data.choices[0].text.trim());
}
