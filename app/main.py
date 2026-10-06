from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.database import Base, engine
from app.core.config import settings
from app.core.logging import setup_logging
from app.api.v1.health import router as health_router
from app.api.v1.upload import router as upload_router
from app.api.v1.ingest import router as ingest_router
from app.api.v1.ocr import router as ocr_router
from app.api.v1.nlp import router as nlp_router
from app.api.v1.report import router as plagiarism_router
from app.routes.auth_routes import router as auth_router
from app.routes.report_routes import router as report_routes

setup_logging()

app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG,
)

# Allow requests from the frontend during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(o) for o in getattr(settings, "CORS_ORIGINS", ["http://localhost:3000"])],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(upload_router)
app.include_router(ingest_router)
app.include_router(ocr_router)
app.include_router(nlp_router)
app.include_router(plagiarism_router)
app.include_router(auth_router)
app.include_router(report_routes)

@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine)
    _run_report_table_migration()
    settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    settings.EXTRACTED_TEXT_DIR.mkdir(parents=True, exist_ok=True)
    settings.NLP_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def _run_report_table_migration():
    # Lightweight SQLite migration to keep existing deployments working.
    with engine.begin() as connection:
        columns = {
            row[1]
            for row in connection.execute(text("PRAGMA table_info(reports)")).fetchall()
        }

        if "ai_percentage" not in columns:
            connection.execute(
                text("ALTER TABLE reports ADD COLUMN ai_percentage FLOAT NOT NULL DEFAULT 0.0")
            )
        if "normal_pdf_path" not in columns:
            connection.execute(
                text("ALTER TABLE reports ADD COLUMN normal_pdf_path VARCHAR NOT NULL DEFAULT ''")
            )
        if "ai_pdf_path" not in columns:
            connection.execute(
                text("ALTER TABLE reports ADD COLUMN ai_pdf_path VARCHAR NOT NULL DEFAULT ''")
            )

