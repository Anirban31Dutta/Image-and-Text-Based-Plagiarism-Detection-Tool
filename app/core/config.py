from pathlib import Path
from typing import ClassVar
from pydantic_settings import BaseSettings


BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"


class Settings(BaseSettings):
    # ========================
    # App metadata & runtime
    # ========================
    APP_NAME: str = "Plagg – Image & Text Based Plagiarism Detector"
    DEBUG: bool = True

    # ========================
    # Core directories
    # ========================
    DATA_DIR: ClassVar[Path] = DATA_DIR

    UPLOAD_DIR: ClassVar[Path] = DATA_DIR / "uploads"
    EXTRACTED_TEXT_DIR: ClassVar[Path] = DATA_DIR / "extracted_text"
    NLP_OUTPUT_DIR: ClassVar[Path] = DATA_DIR / "nlp_output"
    CORPUS_DIR: ClassVar[Path] = DATA_DIR / "corpus"

    # ========================
    # Auto-create dirs
    # ========================
    for _dir in [
        UPLOAD_DIR,
        EXTRACTED_TEXT_DIR,
        NLP_OUTPUT_DIR,
        CORPUS_DIR,
    ]:
        _dir.mkdir(parents=True, exist_ok=True)


settings = Settings()

