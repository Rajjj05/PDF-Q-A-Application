import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.schema import HumanMessage, SystemMessage
from app.utils.pdf_processor import save_uploaded_file
from pathlib import Path
from typing import List
import fitz
import psycopg2
from psycopg2.extras import RealDictCursor

load_dotenv()

class DocumentService:
    def __init__(self):
        self.documents_dir = Path("documents")
        self.documents_dir.mkdir(exist_ok=True)
        self.combined_text = ""
        self.llm = ChatGroq(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            temperature=0.0,
            max_tokens=8192,
            api_key=os.getenv("GROQ_API_KEY")
        )
        self.chat_history = []
        self.conn = psycopg2.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            dbname=os.getenv("DB_NAME"),
        )
        self.conn.autocommit = True
        self._ensure_table()

    def _ensure_table(self):
        with self.conn.cursor() as cur:
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS documents (
                    id SERIAL PRIMARY KEY,
                    filename TEXT NOT NULL,
                    file_path TEXT NOT NULL,
                    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
                """
            )

    async def process_documents(self, files: List):
        file_paths = []
        for file in files:
            if not file.filename.endswith('.pdf'):
                raise ValueError(f"File {file.filename} is not a PDF")
            file_path = await save_uploaded_file(file, self.documents_dir)
            file_paths.append(str(file_path))
            with self.conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO documents (filename, file_path) VALUES (%s, %s)",
                    (file.filename, str(file_path))
                )
        texts = []
        unreadable_files = []
        for file_path in file_paths:
            try:
                doc = fitz.open(file_path)
                text = "\n".join(page.get_text() for page in doc)
                doc.close()
                if text.strip():
                    texts.append(text)
                else:
                    unreadable_files.append(os.path.basename(file_path))
            except Exception as e:
                print(f"Error extracting text from {file_path}: {e}")
                unreadable_files.append(os.path.basename(file_path))
        if texts:
            combined = "\n".join(texts)
            self.combined_text = combined[:16000]
        else:
            self.combined_text = "No text was extracted."
        self.chat_history = []
        if unreadable_files and len(unreadable_files) == len(file_paths):
            return {"status": "error", "message": f"Could not read any text from the uploaded PDF(s): {', '.join(unreadable_files)}. Please upload a valid PDF."}
        elif unreadable_files:
            return {"status": "partial", "message": f"Some PDFs could not be read: {', '.join(unreadable_files)}. Others were processed successfully."}
        return {"status": "parsed", "message": "PDF parsed and ready for Q&A."}

    async def query_documents(self, query: str) -> str:
        if not self.combined_text or self.combined_text == "No text was extracted.":
            return "No documents have been processed yet or no text was extracted."
        document_context = self.combined_text[:16000]
        system_prompt = (
            f"You are a helpful assistant. Answer the user's questions using only the information from the following PDF document.\n\nPDF Content:\n{document_context}\n\nIf the answer is not in the document, say 'The answer is not available in the provided document.' Do not add any extra formatting, metadata, or model details."
        )
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=query)
        ]
        try:
            response = self.llm(messages)
            answer = response.content.strip()
            if not answer:
                return "No answer could be generated from the document."
            return answer
        except Exception as e:
            return f"An error occurred while generating the answer: {str(e)}"
