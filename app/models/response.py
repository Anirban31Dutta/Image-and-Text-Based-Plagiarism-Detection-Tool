from pydantic import BaseModel


class UploadResponse(BaseModel):
    file_id: str
    filename: str
    status: str

