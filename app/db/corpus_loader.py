from pathlib import Path

def load_corpus(corpus_dir: Path) -> list[str]:
    texts = []
    for file in corpus_dir.glob("*.txt"):
        texts.append(file.read_text(encoding="utf-8"))
    return texts

