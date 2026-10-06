from pathlib import Path
from app.services.ingestion.pdf_preprocessor import PDFPreprocessor
from app.services.ingestion.image_preprocessor import ImagePreprocessor
from app.services.ingestion.docx_extractor import extract_docx_text


def ingest(file_path: Path):
    suffix = file_path.suffix.lower()

    if suffix in [".png", ".jpg", ".jpeg"]:
        # Single image → preprocess → OCR later
        processor = ImagePreprocessor()
        return processor.process(file_path)

    if suffix == ".pdf":
        # PDF → split into page images
        processor = PDFPreprocessor()
        return processor.process(file_path)

    if suffix == ".docx":
        # DOCX → direct text extraction (no OCR)
        return extract_docx_text(file_path)

    raise ValueError(f"Unsupported file type: {suffix}")

