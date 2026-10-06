# app/services/nlp/text_store.py

from pathlib import Path
from app.core.config import settings

def load_corpus_texts() -> list[str]:
    """
    Loads all corpus text files for plagiarism comparison.
    """
    corpus_texts = []

    if not settings.CORPUS_DIR.exists():
        return corpus_texts

    for file in settings.CORPUS_DIR.glob("*.txt"):
        try:
            corpus_texts.append(file.read_text(encoding="utf-8"))
        except Exception:
            continue

    return corpus_texts

