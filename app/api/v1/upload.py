from fastapi import APIRouter, UploadFile, File
from app.core.config import settings
from app.utils.file_utils import validate_file, generate_safe_filename
from app.models.response import UploadResponse
from pathlib import Path
import shutil

router = APIRouter(prefix="/upload", tags=["Upload"])


@router.post("/", response_model=UploadResponse)
async def upload_document(file: UploadFile = File(...)):
    validate_file(file)

    safe_name = generate_safe_filename(file.filename)
    destination: Path = settings.UPLOAD_DIR / safe_name

    with destination.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return UploadResponse(
        file_id=safe_name,
        filename=file.filename,
        status="uploaded"
    )

