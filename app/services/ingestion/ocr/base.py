from abc import ABC, abstractmethod
from pathlib import Path

class BaseOCREngine(ABC):

    @abstractmethod
    def extract_text(self, image_path: Path) -> str:
        pass

