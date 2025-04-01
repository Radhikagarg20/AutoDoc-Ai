// -- File Upload and Analysis Workflow --
document.getElementById('uploadForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  fetch('/upload', { method: 'POST', body: formData })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        // Save the extracted text globally
        window.uploadedText = data.text;
        // Display the feature selection panel and results section
        document.getElementById('featurePanel').style.display = 'block';
        document.getElementById('results').style.display = 'block';
        // Populate the extracted text output
        document.getElementById('extractedText').textContent = data.text;
        // Scroll to the feature panel
        setTimeout(() => {
          document.getElementById('featurePanel').scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    });
});

// Analyze a specific feature by sending the text and the chosen feature to /analyze
function analyzeFeature(feature) {
  if (!window.uploadedText) {
    alert('Please upload a document first.');
    return;
  }
  fetch('/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: window.uploadedText, feature: feature })
  })
  .then(response => response.json())
  .then(data => {
    if (feature === 'all' || feature === 'summary') {
      document.getElementById('summaryText').textContent = data.summary || '';
    }
    if (feature === 'all' || feature === 'validation') {
      document.getElementById('validationText').textContent = data.validation || '';
    }
    if (feature === 'all' || feature === 'keywords') {
      document.getElementById('keywordsText').textContent = data.keywords || '';
    }
    if (feature === 'all' || feature === 'language') {
      document.getElementById('languageText').textContent = data.language || '';
    }
    if (feature === 'all' || feature === 'metrics') {
      document.getElementById('metricsText').textContent = data.metrics || '';
    }
    // Scroll to results section after analysis
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
  });
}

// -- Theme Toggle --
const toggleBtn = document.querySelector('.toggle-theme');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    toggleBtn.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
  });
}

// -- Intersection Observer for Result Box Animation --
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.result-box').forEach(box => {
  observer.observe(box);
});

// -- Floating AI Assistant Chat --
const localReplies = {
  "hi": "Hello! How can I help you today?",
  "help": "Try uploading a document, then choose a feature like 'AI Summary' or 'Validation'.",
  "bye": "Goodbye! Have a nice day."
};

// Create a floating assistant button
const assistant = document.createElement('div');
assistant.innerHTML = "🤖 AI Bot";
Object.assign(assistant.style, {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  padding: '10px 20px',
  background: '#00ffe5',
  color: '#000',
  borderRadius: '25px',
  boxShadow: '0 0 10px #00ffe5',
  cursor: 'pointer',
  zIndex: '1000'
});
assistant.title = "Click to chat";
document.body.appendChild(assistant);

// Create a chat window element (initially hidden)
const chatWindow = document.createElement('div');
chatWindow.id = 'chatWindow';
Object.assign(chatWindow.style, {
  position: 'fixed',
  bottom: '70px',
  right: '20px',
  width: '300px',
  maxHeight: '300px',
  background: '#222',
  border: '1px solid #00ffe5',
  borderRadius: '10px',
  padding: '10px',
  display: 'none',
  flexDirection: 'column',
  zIndex: '1000'
});
document.body.appendChild(chatWindow);

// Chat messages container
const chatMessages = document.createElement('div');
chatMessages.id = 'chatMessages';
chatMessages.style.flex = '1';
chatMessages.style.overflowY = 'auto';
chatMessages.style.marginBottom = '10px';
chatMessages.style.color = 'white';
chatWindow.appendChild(chatMessages);

// Chat input
const chatInput = document.createElement('input');
chatInput.type = 'text';
chatInput.placeholder = 'Type your message...';
chatInput.style.width = '100%';
chatInput.style.padding = '8px';
chatWindow.appendChild(chatInput);

// Toggle chat window on assistant click and auto-greet
assistant.addEventListener('click', () => {
  chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
  if (chatWindow.style.display === 'block' && chatMessages.innerHTML.trim() === '') {
    appendChatMessage('AutoDoc AI', "Hello! I'm your AI Assistant. How can I help you?");
  }
});

// Send chat message on Enter key (local dictionary approach)
chatInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter' && chatInput.value.trim() !== '') {
    const userMsg = chatInput.value.trim();
    appendChatMessage('You', userMsg);
    chatInput.value = '';
    const msgLower = userMsg.toLowerCase();
    let foundReply = "Sorry, I didn't understand. Type 'help' to see suggestions.";
    Object.keys(localReplies).forEach(key => {
      if (msgLower.includes(key)) {
        foundReply = localReplies[key];
      }
    });
    appendChatMessage('AutoDoc AI', foundReply);
  }
});

// Function to append chat messages to chat window
function appendChatMessage(sender, message) {
  const msgDiv = document.createElement('div');
  msgDiv.style.marginBottom = '8px';
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// -- 3D Tilt Effect on Container --
document.querySelectorAll('.container').forEach(container => {
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    container.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  });
  container.addEventListener('mouseleave', () => {
    container.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
});
