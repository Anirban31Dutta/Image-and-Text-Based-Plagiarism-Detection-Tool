from pathlib import Path
import logging
from app.core.config import settings
from app.db.corpus_loader import load_corpus
from app.services.similarity.hybrid import HybridSimilarityEngine
from app.services.similarity.scorer import score_matches

logger = logging.getLogger(__name__)


def run_plagiarism(sentences: list[str]):
    corpus = load_corpus(settings.DATA_DIR / "corpus")

    if not corpus:
        logger.warning("Corpus directory is empty (%s). Plagiarism checks will run against an empty corpus.", settings.DATA_DIR / "corpus")

    engine = HybridSimilarityEngine(alpha=0.6)
    similarity = engine.compute(sentences, corpus)

    score, matches = score_matches(similarity, sentences, corpus)
    return score, matches

