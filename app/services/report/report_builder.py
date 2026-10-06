from app.services.similarity import compute_similarity
from app.services.nlp.sentence_splitter import split_into_sentences


def run_plagiarism_check(nlp_result: dict) -> dict:
    """
    Takes NLP output and returns final plagiarism report.

    Expected NLP format:
    {
        "sentences": [...],
        "corpus_sentences": [...] OR corpus_texts
    }
    """

    sentences = nlp_result.get("sentences", [])
    corpus_sentences = nlp_result.get("corpus_sentences") or []
    if not corpus_sentences:
        corpus_texts = nlp_result.get("corpus_texts", [])
        for corpus_text in corpus_texts:
            corpus_sentences.extend(split_into_sentences(corpus_text))

    if not sentences or not corpus_sentences:
        return {
            "plagiarism_percentage": 0.00,
            "matches": []
        }

    plagiarism_percentage, matches = compute_similarity(
        sentences,
        corpus_sentences
    )

    # Ensure all returned values are JSON serializable (no numpy types)
    cleaned_matches = []
    for m in matches:
        cleaned_matches.append({
            "sentence": str(m.get("sentence", "")),
            "similarity": float(m.get("similarity", 0.0)),
            "plagiarized": bool(m.get("plagiarized", False)),
        })

    return {
        "plagiarism_percentage": round(float(plagiarism_percentage), 2),
        "matches": cleaned_matches,
    }

