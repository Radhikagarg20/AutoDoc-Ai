import math

def calculate_metrics(text):
    words = text.split()
    word_count = len(words)
    read_time = math.ceil(word_count / 200)  # assuming 200 words per minute reading speed
    return f"Word Count: {word_count}, Estimated Read Time: {read_time} min"
