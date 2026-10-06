from pathlib import Path
from abc import ABC, abstractmethod

class BasePreprocessor(ABC):

    @abstractmethod
    def process(self, file_path: Path) -> Path:
        """
        Takes an input file and outputs a processed file
        ready for OCR or text extraction.
        """
        pass

