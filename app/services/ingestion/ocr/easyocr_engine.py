from pathlib import Path
import easyocr
from app.services.ingestion.ocr.base import BaseOCREngine

class EasyOCREngine(BaseOCREngine):

    def __init__(self):
        self.reader = easyocr.Reader(["en"], gpu=False)

    def extract_text(self, image_path: Path) -> str:
        results = self.reader.readtext(str(image_path))
        text = " ".join([res[1] for res in results])
        return text.strip()

