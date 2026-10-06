import math
import re


class AIDetectionService:
    """
    Lightweight heuristic AI-text detector.
    Returns a document score (0-100) and sentence-level likelihoods.
    """

    _TOKEN_PATTERN = re.compile(r"\b\w+\b")

    def analyze(self, sentences: list[str]) -> dict:
        if not sentences:
            return {"ai_percentage": 0.00, "sentence_scores": []}

        sentence_scores = []
        for sentence in sentences:
            sentence_scores.append(self._score_sentence(sentence))

        ai_percentage = round(sum(sentence_scores) / len(sentence_scores), 2)

        return {
            "ai_percentage": ai_percentage,
            "sentence_scores": sentence_scores,
        }

    def _score_sentence(self, sentence: str) -> float:
        tokens = self._TOKEN_PATTERN.findall(sentence.lower())
        if not tokens:
            return 0.0

        unique_tokens = len(set(tokens))
        lexical_diversity = unique_tokens / len(tokens)

        token_counts = {}
        for token in tokens:
            token_counts[token] = token_counts.get(token, 0) + 1
        probabilities = [count / len(tokens) for count in token_counts.values()]
        entropy = -sum(prob * math.log2(prob) for prob in probabilities if prob > 0)
        max_entropy = math.log2(max(len(token_counts), 1))
        normalized_entropy = (entropy / max_entropy) if max_entropy > 0 else 0.0

        avg_word_length = sum(len(token) for token in tokens) / len(tokens)
        punctuation_density = len(re.findall(r"[,:;]", sentence)) / max(len(sentence), 1)

        # Heuristic: repetitive yet fluent text with long words and low punctuation
        # tends to skew more AI-like for generic generated prose.
        ai_likelihood = (
            (1.0 - lexical_diversity) * 0.35
            + (1.0 - normalized_entropy) * 0.35
            + min(avg_word_length / 8.0, 1.0) * 0.2
            + max(0.0, 0.1 - punctuation_density) * 1.0
        )

        return round(max(0.0, min(ai_likelihood * 100, 100.0)), 2)
