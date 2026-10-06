from fastapi import UploadFile, HTTPException
from pathlib import Path
import uuid

ALLOWED_EXTENSIONS = {
    ".pdf", ".doc", ".docx", ".png", ".jpg", ".jpeg"
}

MAX_FILE_SIZE_MB = 20


def validate_file(file: UploadFile):
    suffix = Path(file.filename).suffix.lower()

    if suffix not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {suffix}"
        )


def generate_safe_filename(original_name: str) -> str:
    ext = Path(original_name).suffix
    return f"{uuid.uuid4().hex}{ext}"

