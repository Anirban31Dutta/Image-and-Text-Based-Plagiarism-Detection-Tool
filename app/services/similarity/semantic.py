import numpy as np
from sentence_transformers import SentenceTransformer, util

MODEL = SentenceTransformer("all-MiniLM-L6-v2")

class SemanticSimilarity:

    def compute(self, sentences: list[str], corpus: list[str]) -> np.ndarray:
        if not sentences or not corpus:
            return np.zeros((len(sentences), len(corpus)))

        s_emb = MODEL.encode(sentences, convert_to_tensor=True, show_progress_bar=False)
        c_emb = MODEL.encode(corpus, convert_to_tensor=True, show_progress_bar=False)

        scores = util.cos_sim(s_emb, c_emb)
        return scores.cpu().numpy()

