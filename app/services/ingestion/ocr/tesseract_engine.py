from pathlib import Path
import pytesseract
from PIL import Image
from app.services.ingestion.ocr.base import BaseOCREngine

class TesseractOCREngine(BaseOCREngine):

    def extract_text(self, image_path: Path) -> str:
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image)
        return text.strip()

