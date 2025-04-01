from langdetect import detect

def detect_language(text):
    try:
        lang = detect(text)
        return f"Detected language: {lang}"
    except Exception as e:
        return "Language detection failed."
