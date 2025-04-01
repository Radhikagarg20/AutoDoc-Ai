import language_tool_python

def validate_text(text):
    tool = language_tool_python.LanguageTool('en-US')
    matches = tool.check(text)
    return f"Found {len(matches)} grammar/spell issues."
