from pathlib import Path
from docx import Document
from app.core.config import settings
from app.services.ingestion.ocr_pipeline import process_image_for_ocr
import uuid


def extract_docx_text(file_path: Path) -> Path:
    doc = Document(file_path)

    extracted_text = []

    # Extract normal paragraph text
    for para in doc.paragraphs:
        if para.text.strip():
            extracted_text.append(para.text)

    #Extract images from DOCX
    image_texts = []

    for rel in doc.part._rels.values():
        if "image" in rel.target_ref:
            image_part = rel.target_part
            image_bytes = image_part.blob

            image_name = f"{file_path.stem}_img_{uuid.uuid4().hex}.png"
            image_path = settings.UPLOAD_DIR / image_name

            with open(image_path, "wb") as f:
                f.write(image_bytes)

            #OCR on extracted image
            ocr_text = process_image_for_ocr(image_path)
            if ocr_text.strip():
                image_texts.append(ocr_text)

    # Merge all text
    final_text = "\n".join(extracted_text + image_texts)

    output_path = settings.EXTRACTED_TEXT_DIR / f"{file_path.stem}.txt"
    output_path.write_text(final_text, encoding="utf-8")

    return output_path

