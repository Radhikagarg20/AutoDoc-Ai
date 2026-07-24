from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def generate_summary(text):
    try:
        if not text.strip():
            return "No text provided for summarization."

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Summarize the provided text clearly and concisely. "
                        "Preserve the key facts and main ideas."
                    )
                },
                {
                    "role": "user",
                    "content": text[:12000]
                }
            ],
            max_tokens=300
        )

        return response.choices[0].message.content

    except Exception as e:
        return f"Error summarizing: {str(e)}"
