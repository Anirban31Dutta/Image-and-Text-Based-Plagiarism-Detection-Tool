import cv2
from pathlib import Path
from app.services.ingestion.preprocessor import BasePreprocessor

class ImagePreprocessor(BasePreprocessor):

    def process(self, file_path: Path) -> Path:
        img = cv2.imread(str(file_path))

        if img is None:
            raise ValueError("Invalid image file")

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # 🔹 Decide preprocessing strategy
        mean_intensity = gray.mean()

        if mean_intensity < 200:
            # Likely scanned document → apply threshold
            processed = cv2.adaptiveThreshold(
                gray,
                255,
                cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                cv2.THRESH_BINARY,
                31,
                2
            )
        else:
            # Likely diagram / UI → just denoise
            processed = cv2.GaussianBlur(gray, (3, 3), 0)

        output_path = file_path.with_suffix(".processed.png")
        cv2.imwrite(str(output_path), processed)

        return output_path

