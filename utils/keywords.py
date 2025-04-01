import yake

def extract_keywords(text):
    kw_extractor = yake.KeywordExtractor(top=10, stopwords=None)
    keywords = kw_extractor.extract_keywords(text)
    return ', '.join([kw for kw, score in keywords])
