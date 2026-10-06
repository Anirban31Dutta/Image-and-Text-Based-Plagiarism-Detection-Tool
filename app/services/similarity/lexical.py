import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class LexicalSimilarity:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            ngram_range=(1, 3),
            stop_words="english"
        )

    def compute(self, sentences: list[str], corpus: list[str]) -> np.ndarray:
        if not sentences or not corpus:
            return np.zeros((len(sentences), len(corpus)))

        vectors = self.vectorizer.fit_transform(corpus + sentences)
        corpus_vecs = vectors[:len(corpus)]
        sentence_vecs = vectors[len(corpus):]

        return cosine_similarity(sentence_vecs, corpus_vecs)

