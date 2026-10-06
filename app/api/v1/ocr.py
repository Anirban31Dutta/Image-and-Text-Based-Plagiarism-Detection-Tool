# app/api/v1/ocr.py

print("OCR module loaded")

from fastapi import APIRouter, HTTPException
from pathlib import Path

from app.core.config import settings
from app.services.ingestion.ocr_pipeline import process_image_for_ocr

router = APIRouter(prefix="/ocr", tags=["OCR"])


@router.post("/{file_id}")
async def run_ocr_endpoint(file_id: str):
    """
    OCR endpoint.

    Behavior:
    - PNG / JPG → OCR is applied here
    - PDF → OCR already handled during ingestion
    - DOCX → OCR already handled during ingestion (embedded images)
    """

    file_id = file_id.lower()
    suffix = Path(file_id).suffix
    base_name = Path(file_id).stem

    # ✅ DOCX: OCR already done during ingestion
    if suffix == ".docx":
        return {
            "file_id": file_id,
            "status": "ocr_done_during_ingestion"
        }

    # ✅ PDF: OCR already done during ingestion (hybrid pipeline)
    if suffix == ".pdf":
        return {
            "file_id": file_id,
            "status": "ocr_done_during_ingestion"
        }

    # ✅ IMAGE FILES → OCR HERE
    if suffix not in [".png", ".jpg", ".jpeg"]:
        raise HTTPException(
            status_code=400,
            detail=f"OCR not supported for file type: {suffix}"
        )

    # Look for processed image
    image_path = settings.UPLOAD_DIR / f"{base_name}.processed.png"

    if not image_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Processed image not found for OCR"
        )

    # Run OCR
    extracted_text = process_image_for_ocr(image_path)

    if not extracted_text.strip():
        raise HTTPException(
            status_code=422,
            detail="OCR completed but no text detected"
        )

    # Save extracted text
    output_path = settings.EXTRACTED_TEXT_DIR / f"{base_name}.txt"
    output_path.write_text(extracted_text, encoding="utf-8")

    return {
        "file_id": file_id,
        "text_file": output_path.name,
        "status": "ocr_completed"
    }

