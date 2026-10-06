from pathlib import Path
from app.services.ingestion.ocr.easyocr_engine import EasyOCREngine

_engine = EasyOCREngine()   # default engine

def run_ocr(image_path: Path) -> str:
    return _engine.extract_text(image_path)

