from pathlib import Path
import pytesseract
from PIL import Image


def process_image_for_ocr(image_path: Path) -> str:
    """
    Pure OCR utility.
    Takes an image path and returns extracted text.
    NO saving, NO file_id, NO side effects.
    """
    try:
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        raise RuntimeError(f"OCR failed for {image_path.name}: {e}")

