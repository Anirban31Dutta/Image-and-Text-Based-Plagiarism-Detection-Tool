from pathlib import Path
from app.core.config import settings

def save_extracted_text(file_id: str, text: str) -> Path:
    output_path = settings.EXTRACTED_TEXT_DIR / f"{file_id}.txt"
    output_path.write_text(text, encoding="utf-8")
    return output_path

