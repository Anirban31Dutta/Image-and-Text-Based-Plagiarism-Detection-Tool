from pathlib import Path
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML


def generate_pdf(
    file_id,
    score_percentage,
    highlighted_text,
    output_suffix="report",
    report_title="Plagiarism Report",
    score_label="Plagiarism Percentage",
):

    Path("reports").mkdir(parents=True, exist_ok=True)
    env = Environment(loader=FileSystemLoader("app/templates"))
    template = env.get_template("report_template.html")

    html_content = template.render(
        file_id=file_id,
        percentage=round(score_percentage, 2),
        content=highlighted_text,
        report_title=report_title,
        score_label=score_label,
    )
    stem = Path(file_id).stem
    output_path = f"reports/{stem}_{output_suffix}.pdf"

    HTML(string=html_content).write_pdf(output_path)

    return output_path
