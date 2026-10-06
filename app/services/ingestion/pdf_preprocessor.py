from pathlib import Path

import fitz  # PyMuPDF

from app.core.config import settings
from app.services.ingestion.pdf_ocr_service import PDFOCRService


class PDFPreprocessor:
    def __init__(self):
        self.pdf_ocr_service = PDFOCRService()

    def process(self, pdf_path: Path) -> Path:
        extracted_text = []

        with fitz.open(pdf_path) as document:
            for page in document:
                page_text = page.get_text().strip()
                if page_text:
                    extracted_text.append(page_text)

        if self.pdf_ocr_service.has_images(pdf_path):
            ocr_text = self.pdf_ocr_service.extract_ocr_text(pdf_path)
            if ocr_text:
                extracted_text.append(ocr_text)

        # Write final merged text
        output_path = settings.EXTRACTED_TEXT_DIR / f"{pdf_path.stem}.txt"
        output_path.write_text("\n".join(extracted_text), encoding="utf-8")

        return output_path

