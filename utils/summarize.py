from transformers import pipeline

# Load summarization model
summarizer = pipeline("summarization")

def generate_summary(text):
    try:
        if len(text) > 1024:
            text = text[:1024]
        result = summarizer(text, max_length=150, min_length=40, do_sample=False)
        return result[0]['summary_text']
    except Exception as e:
        return f"Error summarizing: {str(e)}"
