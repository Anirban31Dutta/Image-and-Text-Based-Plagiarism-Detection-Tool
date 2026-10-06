from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.db_models import Report, User
from app.dependencies import get_current_user, get_db
from app.schemas import ReportHistoryItem


router = APIRouter(tags=["Reports"])


@router.get("/reports", response_model=list[ReportHistoryItem])
def list_reports(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return (
        db.query(Report)
        .filter(Report.user_id == current_user.id)
        .order_by(Report.created_at.desc())
        .all()
    )


@router.get("/download/{report_id}")
def download_report(
    report_id: int,
    type: str = "normal",
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    report = (
        db.query(Report)
        .filter(Report.id == report_id, Report.user_id == current_user.id)
        .first()
    )
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    if type not in {"normal", "ai"}:
        raise HTTPException(status_code=400, detail="Invalid report type. Use normal or ai.")

    selected_path = report.normal_pdf_path if type == "normal" else report.ai_pdf_path
    if not selected_path and report.pdf_path:
        selected_path = report.pdf_path

    pdf_path = Path(selected_path)
    if not pdf_path.exists():
        raise HTTPException(status_code=404, detail="PDF file not found")

    return FileResponse(path=pdf_path, filename=pdf_path.name, media_type="application/pdf")
