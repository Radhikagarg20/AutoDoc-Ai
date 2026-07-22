from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
from openai import OpenAI

from utils.extract_text import extract_text_from_file
from utils.validate_text import validate_text
from utils.detect_language import detect_language
from utils.summarize import generate_summary
from utils.keywords import extract_keywords
from utils.metrics import calculate_metrics


load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/upload", methods=["POST"])
def upload_file():
    uploaded_file = request.files.get("file")

    if not uploaded_file:
        return jsonify({"error": "No file uploaded"}), 400

    filepath = os.path.join(
        app.config["UPLOAD_FOLDER"],
        uploaded_file.filename
    )

    uploaded_file.save(filepath)

    text = extract_text_from_file(filepath)

    return jsonify({"text": text})


@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json() or {}

    text = data.get("text", "")
    feature = data.get("feature", "all")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    result = {}

    if feature in ["all", "summary"]:
        result["summary"] = generate_summary(text)

    if feature in ["all", "validation"]:
        result["validation"] = validate_text(text)

    if feature in ["all", "language"]:
        result["language"] = detect_language(text)

    if feature in ["all", "keywords"]:
        result["keywords"] = extract_keywords(text)

    if feature in ["all", "metrics"]:
        result["metrics"] = calculate_metrics(text)

    return jsonify(result)


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json() or {}

    user_msg = data.get("message", "").strip()

    if not user_msg:
        return jsonify({
            "response": "Please enter a message."
        })

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant."
                },
                {
                    "role": "user",
                    "content": user_msg
                }
            ]
        )

        reply = response.choices[0].message.content

    except Exception as e:
        print(f"OpenAI Error: {e}")

        return jsonify({
            "response": "Sorry, an error occurred while processing your request."
        }), 500

    return jsonify({
        "response": reply
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000))
    )
