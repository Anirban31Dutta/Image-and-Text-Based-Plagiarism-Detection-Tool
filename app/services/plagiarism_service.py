import json
from pathlib import Path

from app.core.config import settings
from app.services.ai_detection_service import AIDetectionService
from app.services.report.highlighter import highlight_sentences
from app.services.report.pdf_generator import generate_pdf
from app.services.report.report_builder import run_plagiarism_check


def run_plagiarism_for_file(file_id: str) -> dict:
    """
    Wraps existing plagiarism, highlight and PDF generation functions.
    """
    stem = Path(file_id).stem
    nlp_output_path = settings.NLP_OUTPUT_DIR / f"{stem}.json"

    with open(nlp_output_path, "r", encoding="utf-8") as handle:
        nlp_data = json.load(handle)

    report = run_plagiarism_check(nlp_data)
    matches = report["matches"]
    ai_detector = AIDetectionService()
    ai_detection = ai_detector.analyze([m["sentence"] for m in matches])

    sentences = [m["sentence"] for m in matches]
    scores = [m["similarity"] for m in matches]
    highlighted_text = highlight_sentences(sentences, scores)

    plagiarism_percentage = round(float(report["plagiarism_percentage"]), 2)
    normal_pdf_path = generate_pdf(
        file_id,
        plagiarism_percentage,
        highlighted_text,
        output_suffix="plagiarism_report",
        report_title="Plagiarism Report",
        score_label="Plagiarism Percentage",
    )

    ai_highlighted_text = highlight_sentences(
        sentences,
        ai_detection["sentence_scores"],
        threshold=50.0,
        highlight_class="ai-detected",
    )
    ai_pdf_path = generate_pdf(
        file_id,
        ai_detection["ai_percentage"],
        ai_highlighted_text,
        output_suffix="ai_report",
        report_title="AI Plagiarism Report",
        score_label="AI Plagiarism Score",
    )

    analysis = [
        {
            "sentence": m["sentence"],
            "similarity_score": m["similarity"],
            "is_plagiarized": m.get("plagiarized", False),
            "ai_likelihood": ai_detection["sentence_scores"][idx],
        }
        for idx, m in enumerate(matches)
    ]

    return {
        "plagiarism_percentage": plagiarism_percentage,
        "ai_percentage": ai_detection["ai_percentage"],
        "analysis": analysis,
        "normal_pdf_path": normal_pdf_path,
        "ai_pdf_path": ai_pdf_path,
        "total_sentences": len(analysis),
        "plagiarized": sum(1 for item in analysis if item["is_plagiarized"]),
    }
