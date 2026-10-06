# app/api/v1/nlp.py

from fastapi import APIRouter, HTTPException
from pathlib import Path

from app.core.config import settings
from app.services.nlp.nlp_pipeline import run_nlp_pipeline

router = APIRouter(prefix="/nlp", tags=["NLP"])


@router.post("/{file_id}")
async def run_nlp(file_id: str):
    """
    Runs NLP pipeline on extracted text and saves output JSON.
    """

    # normalize
    file_id = file_id.lower()
    stem = Path(file_id).stem

    extracted_text_path = settings.EXTRACTED_TEXT_DIR / f"{stem}.txt"
    if not extracted_text_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Extracted text not found. Run OCR before NLP."
        )

    nlp_output = run_nlp_pipeline(stem)

    return {
        "file_id": file_id,
        "status": "nlp_completed",
        "sentences": len(nlp_output.get("sentences", []))
    }

