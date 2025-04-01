import pdfplumber
import docx
import os

def extract_text_from_file(filepath):
    ext = os.path.splitext(filepath)[1].lower()

    if ext == '.pdf':
        with pdfplumber.open(filepath) as pdf:
            return '\n'.join(page.extract_text() for page in pdf.pages if page.extract_text())
    
    elif ext == '.docx':
        doc = docx.Document(filepath)
        return '\n'.join([p.text for p in doc.paragraphs])
    
    elif ext == '.txt':
        with open(filepath, 'r', encoding='utf-8') as file:
            return file.read()

    else:
        return "Unsupported file format"
