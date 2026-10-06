from app.services.similarity.hybrid import HybridSimilarityEngine
from app.services.similarity.scorer import score_matches


def compute_similarity(sentences: list[str], corpus: list[str]):

    engine = HybridSimilarityEngine(alpha=0.6)

    similarity_matrix = engine.compute(sentences, corpus)

    plagiarism_percentage, matches = score_matches(
        similarity_matrix,
        sentences,
        corpus
    )

    return plagiarism_percentage, matches
