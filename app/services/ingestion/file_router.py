from pathlib import Path

def detect_file_type(file_path: Path) -> str:
    suffix = file_path.suffix.lower()

    if suffix in [".png", ".jpg", ".jpeg"]:
        return "image"
    if suffix == ".pdf":
        return "pdf"
    if suffix in [".doc", ".docx"]:
        return "docx"

    raise ValueError(f"Unsupported file type: {suffix}")

