# 📄 Plagiarism Detector

A full-stack **AI-powered plagiarism detection system** that analyzes text documents and image-based content to identify potential plagiarism using **Natural Language Processing (NLP), OCR, semantic similarity, and machine learning techniques**.
This project is my college major project. The system provides a modern web interface where users can upload documents and receive plagiarism analysis with similarity scores.

---

## 🚀 Features

- 📄 **Document Plagiarism Detection**
  - Supports PDF and DOCX documents.
  - Extracts and analyzes textual content.

- 🖼️ **Image-Based Plagiarism Detection**
  - Extracts text from images using OCR.
  - Uses the extracted text for similarity analysis.

- 🧠 **NLP-Based Analysis**
  - Text preprocessing and linguistic analysis.
  - Sentence-level similarity comparison.

- 🔍 **Semantic Similarity Detection**
  - Uses Sentence Transformers to identify semantically similar content.
  - Detects similarity even when the wording is not exactly identical.

- 📊 **Plagiarism Percentage**
  - Generates a similarity/plagiarism percentage based on the analysis.

- ⚡ **FastAPI Backend**
  - High-performance Python backend.
  - REST API architecture.
  - Swagger UI available for API testing.

- 💻 **Modern Web Dashboard**
  - Built using Next.js and TypeScript.
  - Responsive interface using Tailwind CSS.

- 📑 **Report Generation**
  - Generates reports containing plagiarism analysis results.

- 🧩 **Modular Architecture**
  - Separate frontend and backend.
  - Organized project structure for easier maintenance and future improvements.

---

## 🎯 Project Objective

The main objective of this project is to build an automated plagiarism detection platform that can help students, educators, and institutions identify potentially copied or highly similar content.

The system combines traditional text processing techniques with modern semantic similarity methods to provide more meaningful plagiarism detection.

### Main Goals

- Detect similarities between documents.
- Extract text from image-based questions/documents.
- Compare sentences using semantic similarity.
- Generate plagiarism scores.
- Provide a simple web-based interface.
- Create a scalable architecture for future improvements.

---

## 🧠 How the System Works

The plagiarism detection process follows a multi-stage pipeline:

```text
                ┌─────────────────────┐
                │     User Upload     │
                │ PDF / DOCX / Image  │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │  Document Ingestion │
                └──────────┬──────────┘
                           │
                 ┌─────────┴─────────┐
                 │                   │
                 ▼                   ▼
        ┌────────────────┐   ┌────────────────┐
        │ Text Extraction│   │   OCR Engine   │
        │ PDF / DOCX     │   │ Image → Text   │
        └────────┬───────┘   └───────┬────────┘
                 │                   │
                 └─────────┬─────────┘
                           ▼
                ┌─────────────────────┐
                │   Text Processing   │
                │  NLP / Cleaning     │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ Similarity Analysis │
                │ Semantic Matching   │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ Plagiarism Score    │
                │     Generation      │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │     Final Report    │
                └─────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| TypeScript | Type-safe development |
| Tailwind CSS | UI styling |
| Fetch API | Backend communication |

### Backend

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| FastAPI | REST API framework |
| Pydantic | Data validation |
| Uvicorn | Application server |
| SQLAlchemy | Database interaction |

### AI / NLP

| Technology | Purpose |
|---|---|
| Sentence Transformers | Semantic similarity |
| spaCy | NLP processing |
| NLTK | Text processing |
| Scikit-learn | Similarity and ML utilities |
| Transformers | Transformer-based NLP models |

### OCR & Document Processing

| Technology | Purpose |
|---|---|
| EasyOCR | Image text extraction |
| Tesseract / Pytesseract | OCR processing |
| OpenCV | Image processing |
| PyMuPDF | PDF processing |
| python-docx | DOCX processing |
| Pillow | Image processing |

### Database & Security

| Technology | Purpose |
|---|---|
| SQLite / SQLAlchemy | Data storage |
| Python-JOSE | Authentication / JWT |
| Passlib | Password hashing |

---

## 🏗️ Project Architecture

The project follows a full-stack architecture:

```text
                    ┌─────────────────────┐
                    │      Frontend       │
                    │      Next.js        │
                    │     TypeScript      │
                    └──────────┬──────────┘
                               │
                         HTTP / API
                               │
                               ▼
                    ┌─────────────────────┐
                    │      FastAPI        │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
       ┌───────────┐     ┌───────────┐     ┌───────────┐
       │    NLP    │     │    OCR    │     │ Database  │
       │  Engine   │     │  Engine   │     │ SQLAlchemy│
       └─────┬─────┘     └─────┬─────┘     └───────────┘
             │                 │
             └────────┬────────┘
                      ▼
             ┌───────────────────┐
             │ Similarity Engine │
             └─────────┬─────────┘
                       ▼
             ┌───────────────────┐
             │ Plagiarism Report │
             └───────────────────┘
```

---

## 📁 Project Structure

```text
Plagiarism_Detector/
│
├── app/
│   ├── main.py
│   └── ...
│
├── assets/
│   └── ...
│
├── data/
│   └── ...
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── reports/
│   └── ...
│
├── tests/
│   └── ...
│
├── .gitignore
├── LICENSE
├── plagg.db
├── requirements.txt
└── README.md
```

> The exact files inside some folders may change as the project is developed further.

---

## 🔄 Application Workflow

### Step 1 — Upload

The user uploads a supported document or image through the frontend.

### Step 2 — Document Processing

The backend identifies the uploaded file type and extracts the required content.

### Step 3 — OCR Processing

For image-based content, OCR techniques are used to convert image content into text.

### Step 4 — NLP Processing

The extracted text is cleaned and processed using NLP techniques.

### Step 5 — Similarity Analysis

The system compares the content using semantic similarity techniques and generates similarity scores.

### Step 6 — Plagiarism Score

The similarity results are converted into a plagiarism/similarity percentage.

### Step 7 — Report

The final result is presented through the web interface and reports.

---

## 🧪 Plagiarism Detection Techniques

### 1. Text Similarity

The system processes extracted text and compares the content to identify similar sections.

### 2. Sentence-Level Similarity

Individual sentences can be analyzed to identify potentially copied or highly similar content.

### 3. Semantic Similarity

Sentence Transformer models are used to compare the meaning of text rather than relying only on exact word matching.

This helps identify cases where the same idea has been written using different words.

### 4. OCR-Based Detection

Images can be processed using OCR to extract text before performing plagiarism analysis.

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure the following are installed:

- Python 3.10+
- Node.js
- npm
- Git
- VS Code

---

## 📥 Clone the Repository

```bash
git clone https://github.com/Anirban31Dutta/Plagiarism_Detector.git

cd Plagiarism_Detector
```

---

# 🐍 Backend Setup

### 1. Create a Virtual Environment

#### Windows

```bash
python -m venv plag
```

Activate it:

```bash
plag\Scripts\activate
```

#### macOS / Linux

```bash
python3 -m venv plag
source plag/bin/activate
```

---

### 2. Install Python Dependencies

```bash
pip install -r requirements.txt
```

The project requirements include FastAPI, EasyOCR, spaCy, Sentence Transformers, OpenCV, PyMuPDF, scikit-learn, PyTorch and other supporting libraries.

---

### 3. Start the Backend

```bash
uvicorn app.main:app --reload
```

The backend will start locally.

API documentation can be accessed through:

```text
http://127.0.0.1:8000/docs
```

The Swagger UI can be used to test the backend APIs.

---

# 💻 Frontend Setup

Open a new terminal:

```bash
cd frontend
```

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

The frontend will then be available at the local development URL shown by Next.js.

---

## 🔐 Environment Variables

If environment variables are required, create a `.env` file according to the configuration used by the backend/frontend.

Example:

```env
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
```

> Do not commit passwords, API keys, secret keys, or other sensitive credentials to GitHub.

---

## 📊 Example Use Case

### Academic Assignment Checking

A student submits an assignment in PDF or DOCX format.

```text
Assignment
     │
     ▼
Text Extraction
     │
     ▼
NLP Processing
     │
     ▼
Semantic Comparison
     │
     ▼
Similarity Score
     │
     ▼
Plagiarism Report
```

The system can help identify content that is potentially similar to reference material.

---

## 📈 Current Capabilities

- ✅ PDF text processing
- ✅ DOCX text processing
- ✅ Image-based text extraction
- ✅ OCR support
- ✅ NLP processing
- ✅ Sentence similarity
- ✅ Semantic similarity
- ✅ Plagiarism percentage
- ✅ FastAPI backend
- ✅ Next.js frontend
- ✅ Swagger API documentation
- ✅ Database integration
- ✅ Report generation

---

## 🚧 Future Improvements

The project can be further improved by adding:

- 🤖 AI-generated text detection
- 🌐 Web-based plagiarism source crawling
- 📚 Large reference-document corpus
- 🔎 Detailed sentence-level highlighting
- 📊 Advanced analytics dashboard
- 👤 User authentication and profiles
- ☁️ Cloud deployment
- ⚡ Improved similarity algorithms
- 🧠 Fine-tuning models using academic datasets
- 📑 More detailed plagiarism reports
- 🔗 Source/reference identification
- 🗂️ Batch document comparison

---

## 🎓 Learning Outcomes

This project provides practical experience with:

- Full-stack web development
- REST API development
- FastAPI
- Next.js
- TypeScript
- Natural Language Processing
- Semantic similarity
- OCR
- Computer Vision
- Machine Learning
- Document processing
- Database integration
- API testing
- Frontend-backend integration
- Git and GitHub

---

## 💼 Resume Description

**Plagiarism Detector — Full-Stack AI Application**

> Developed a full-stack plagiarism detection system using **Python, FastAPI, Next.js, NLP, OCR, and Sentence Transformers** to analyze PDF, DOCX, and image-based content. Implemented semantic similarity analysis, OCR-based text extraction, plagiarism percentage scoring, REST APIs, and a responsive web dashboard.


---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📌 Disclaimer

This project provides similarity/plagiarism analysis as an automated aid. A similarity score should not be treated as definitive proof of plagiarism without appropriate human review and context.