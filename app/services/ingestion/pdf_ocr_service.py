from __future__ import annotations

from pathlib import Path
from tempfile import NamedTemporaryFile
from typing import Iterable

import fitz  # PyMuPDF

from app.services.ingestion.ocr_pipeline import process_image_for_ocr


class PDFOCRService:
    """
    Extracts OCR text from embedded PDF images.
    """

    def extract_ocr_text(self, pdf_path: Path) -> str:
        with fitz.open(pdf_path) as document:
            image_bytes = self._extract_image_bytes(document)
            ocr_chunks = [self._run_ocr(payload) for payload in image_bytes]

        return "\n".join(chunk for chunk in ocr_chunks if chunk)

    def has_images(self, pdf_path: Path) -> bool:
        with fitz.open(pdf_path) as document:
            return any(page.get_images(full=True) for page in document)

    def _extract_image_bytes(self, document: fitz.Document) -> Iterable[bytes]:
        for page in document:
            for img in page.get_images(full=True):
                xref = img[0]
                base_image = document.extract_image(xref)
                payload = base_image.get("image")
                if payload:
                    yield payload

    def _run_ocr(self, image_payload: bytes) -> str:
        with NamedTemporaryFile(suffix=".png", delete=True) as temp_file:
            temp_file.write(image_payload)
            temp_file.flush()
            text = process_image_for_ocr(Path(temp_file.name))
            return text.strip()
