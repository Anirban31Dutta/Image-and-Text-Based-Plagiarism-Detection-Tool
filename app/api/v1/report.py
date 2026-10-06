from fastapi import APIRouter, Depends, HTTPException
from pathlib import Path
from sqlalchemy.orm import Session

from app.core.config import settings
from app.db_models import Report, User
from app.dependencies import get_current_user, get_db
from app.services.plagiarism_service import run_plagiarism_for_file

router = APIRouter(prefix="/plagiarism", tags=["Plagiarism"])


@router.post("/{file_id}")
async def run_plagiarism(
    file_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Plagiarism Detection Endpoint

    Expects:
    - NLP pipeline already executed
    - NLP output stored as JSON

    Returns:
    - Plagiarism percentage
    - Sentence-level similarity scores
    """

    file_id = file_id.lower()
    stem = Path(file_id).stem

    #  NLP output produced earlier
    nlp_output_path = settings.NLP_OUTPUT_DIR / f"{stem}.json"

    if not nlp_output_path.exists():
        raise HTTPException(
            status_code=404,
            detail="NLP output not found. Run NLP before plagiarism."
        )

    try:
        result = run_plagiarism_for_file(file_id)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Plagiarism processing failed: {exc}")

    report_record = Report(
        user_id=current_user.id,
        file_name=stem,
        plagiarism_percentage=result["plagiarism_percentage"],
        ai_percentage=result["ai_percentage"],
        normal_pdf_path=result["normal_pdf_path"],
        ai_pdf_path=result["ai_pdf_path"],
        pdf_path=result["normal_pdf_path"],
    )
    db.add(report_record)
    db.commit()
    db.refresh(report_record)

    return {
        "file_id": file_id,
        "report_id": report_record.id,
        "plagiarism_percentage": result["plagiarism_percentage"],
        "ai_percentage": result["ai_percentage"],
        "analysis": result["analysis"],
        "total_sentences": result["total_sentences"],
        "plagiarized": result["plagiarized"],
        "download_report": result["normal_pdf_path"],
        "normal_pdf_path": result["normal_pdf_path"],
        "ai_pdf_path": result["ai_pdf_path"],
        "status": "plagiarism_completed",
    }
