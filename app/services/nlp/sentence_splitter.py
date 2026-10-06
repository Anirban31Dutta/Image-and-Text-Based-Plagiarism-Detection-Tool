# app/services/nlp/sentence_splitter.py

import re

def split_into_sentences(text: str) -> list[str]:
    """
    Splits text into sentences using simple regex.
    """
    sentences = re.split(r'(?<=[.!?])\s+', text)
    return [s.strip() for s in sentences if s.strip()]

