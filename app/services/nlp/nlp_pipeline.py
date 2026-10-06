# app/services/nlp/nlp_pipeline.py

from pathlib import Path
import json

from app.core.config import settings
from app.services.nlp.sentence_splitter import split_into_sentences
from app.services.nlp.text_store import load_corpus_texts


def run_nlp_pipeline(file_id: str) -> dict:
    """
    Runs NLP pipeline on extracted OCR text and saves output as JSON.
    """

    stem = Path(file_id).stem
    extracted_text_path = settings.EXTRACTED_TEXT_DIR / f"{stem}.txt"

    if not extracted_text_path.exists():
        raise FileNotFoundError("Extracted text not found. Run OCR first.")

    text = extracted_text_path.read_text(encoding="utf-8")

    sentences = split_into_sentences(text)
    corpus_texts = load_corpus_texts()

    output = {
        "file_id": file_id,
        "sentences": sentences,
        "corpus_texts": corpus_texts
    }

    # Ensure NLP output dir exists
    settings.NLP_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    output_path = settings.NLP_OUTPUT_DIR / f"{stem}.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2)

    return output

