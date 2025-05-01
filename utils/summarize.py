from transformers import pipeline

summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

def generate_summary(text):
    try:
        if len(text) > 1024:
            text = text[:1024]
        result = summarizer(text, max_length=150, min_length=40, do_sample=False)
        return result[0]['summary_text']
    except Exception as e:
        return f"Error summarizing: {str(e)}"
