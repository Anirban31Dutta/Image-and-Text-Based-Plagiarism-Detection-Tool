from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ReportHistoryItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    file_name: str
    plagiarism_percentage: float
    ai_percentage: float
    normal_pdf_path: str
    ai_pdf_path: str
    pdf_path: str | None = None
    created_at: datetime
