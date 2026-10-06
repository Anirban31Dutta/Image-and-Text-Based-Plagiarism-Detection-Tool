import numpy as np
from app.services.similarity.lexical import LexicalSimilarity
from app.services.similarity.semantic import SemanticSimilarity


class HybridSimilarityEngine:
    def __init__(self, alpha: float = 0.6):
        self.alpha = alpha
        self.lexical = LexicalSimilarity()
        self.semantic = SemanticSimilarity()

    def compute(self, sentences: list[str], corpus: list[str]) -> np.ndarray:
        lex = self.lexical.compute(sentences, corpus)
        sem = self.semantic.compute(sentences, corpus)

        return self.alpha * lex + (1 - self.alpha) * sem

