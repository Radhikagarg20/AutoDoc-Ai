# AI-Powered Text Analyzer & Chatbot

An intelligent **Flask-based AI application** that allows users to **analyze text** (summarization, language detection, keyword extraction, etc.) and interact with an **AI chatbot** powered by OpenAI.

## 🌟 Features

✅ **Text Analysis**
- Extract text from uploaded files
- Summarize long text content
- Validate text quality
- Detect language automatically
- Extract key topics & keywords
- Calculate readability and complexity metrics

✅ **AI Chatbot**
- Natural language understanding
- Human-like AI responses using OpenAI's GPT model
- User-friendly chatbot interface

✅ **Secure API Integration**
- Uses **.env** file for API security
- Built with **Flask & OpenAI API**

---

## 📂 Project Structure

📦 AutoDoc-AI
│-- 📂 static/                  # Static files (CSS, JS)
│-- 📂 templates/               # HTML templates
│-- 📂 uploads/                 # Uploaded files storage
│-- 📂 utils/                   # Core utility functions
│   │-- extract_text.py         # Extract text from files
│   │-- validate_text.py        # Validate text quality
│   │-- detect_language.py      # Detect language
│   │-- summarize.py            # Summarize text
│   │-- keywords.py             # Extract keywords
│   │-- metrics.py              # Calculate text complexity
│-- 📂 tests/                   # Unit tests for functions
│-- 📂 logs/                    # Log files (for debugging)
│-- .env                        # API key (DO NOT SHARE)
│-- app.py                      # Main Flask application
│-- config.py                   # Configuration settings
│-- requirements.txt            # Project dependencies
│-- README.md                   # Documentation
│-- .gitignore                  # Ignore unnecessary files

---

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/AI-Text-Analyzer-Chatbot.git
cd AI-Text-Analyzer-Chatbot


### **2️⃣ Create a Virtual Environment (Optional but Recommended)**
```sh
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate     # On Windows


3️⃣ Install Dependencies
pip install -r requirements.txt

3️⃣ Install Dependencies
pip install -r requirements.txt

4️⃣ Add Your OpenAI API Key
Create a .env file and add:
OPENAI_API_KEY=your-api-key-here

5️⃣ Run the Application
python app.py


Open http://127.0.0.1:5000/ in your browser.

🛠 API Endpoints
Upload a File
POST /upload

Description: Extracts text from uploaded files.

Request: multipart/form-data

Analyze Text
POST /analyze

Description: Performs text analysis based on the selected feature.

Request: JSON

{
  "text": "Your text here",
  "feature": "summary"
}


Chat with AI
POST /chat

Description: Chatbot interaction using OpenAI.

Request: JSON

{
  "message": "Hello, how are you?"
}

👨‍💻 Technologies Used
Python (Flask)
OpenAI GPT API
JavaScript, HTML, CSS
dotenv (for environment variables)

🎯 Future Enhancements
✅ Speech-to-Text Processing
✅ User Authentication (Login/Signup)
✅ Dark Mode UI
✅ Multilingual Support

🤝 Contributing
Fork this repository.
Clone your fork.
Create a new branch (feature-branch).
Commit your changes.
Push to your GitHub and submit a Pull Request.

📝 License
This project is open-source under the MIT License.

🚀 Like this project? Give it a ⭐ on GitHub!




## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/AI-Text-Analyzer-Chatbot.git
cd AI-Text-Analyzer-Chatbot

---

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**

git clone https://github.com/your-username/AI-Text-Analyzer-Chatbot.git
cd AI-Text-Analyzer-Chatbot

---

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**

git clone https://github.com/your-username/AI-Text-Analyzer-Chatbot.git
cd AI-Text-Analyzer-Chatbot

---

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**

git clone https://github.com/your-username/AI-Text-Analyzer-Chatbot.git
cd AI-Text-Analyzer-Chatbot

---

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**

git clone https://github.com/your-username/AI-Text-Analyzer-Chatbot.git
cd AI-Text-Analyzer-Chatbot

